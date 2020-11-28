import {
  Question,
  QuestionGroup,
  Test,
  Result,
  TestResult,
  YesNoAnswer,
} from "./testDefinition";

export function onAnswer(
  current: Test,
  question: Question,
  answer: YesNoAnswer
): Test {
  const subQuestions = getSubquestionsOf(question);

  const groups: QuestionGroup[] = current.groups.map((group) => {
    if (containsQuestion(group.questions, question)) {
      const questions: Question[] = [];
      for (let q of group.questions) {
        if (containsQuestion(subQuestions, q)) {
          //in order to remove from questions list all already displayed sub questions of answered questions
          continue;
        }
        if (q.text !== question.text) {
          questions.push(q);
          continue;
        }

        switch (answer) {
          case "Yes":
            if (q.onYes.result === "AnotherQuestion") {
              questions.push({
                ...q,
                answer,
                result: "AnotherQuestion",
                resultMessage: q.onYes.additionalMessage,
              });

              questions.push({
                ...q.onYesQuestion!,
              });
            } else {
              questions.push({
                ...q,
                answer,
                result: q.onYes.result,
                resultMessage: q.onYes.additionalMessage,
              });
            }
            break;
          case "No":
            if (q.onNo.result === "AnotherQuestion") {
              questions.push({
                ...q,
                answer,
                result: "AnotherQuestion",
                resultMessage: q.onNo.additionalMessage,
              });

              questions.push({
                ...q.onNoQuestion!,
              });
            } else {
              questions.push({
                ...q,
                answer,
                result: q.onNo.result,
                resultMessage: q.onNo.additionalMessage,
              });
            }
            break;
        }
      }

      return {
        ...group,
        questions,
        result: questions.some((q) => q.answer == null)
          ? null
          : calculateResult(questions),
      };
    }
    return group;
  });

  const allQuestions = groups.flatMap((g) => g.questions);
  const answeredQuestions = allQuestions.filter((q) => q.answer != null);

  const [
    result,
    resultWarningAndErrorMessages,
    resultSuccessMessages,
  ] = calculateTestResult(answeredQuestions);

  return {
    groups,
    numberOfAllQuestions: allQuestions.length,
    numberOfAnsweredQuestions: answeredQuestions.length,
    isDone:
      current.numberOfAllQuestions === answeredQuestions.length ||
      result === "Error",
    result,
    resultWarningAndErrorMessages,
    resultSuccessMessages,
  };

  function containsQuestion(questions: Question[], question: Question) {
    return questions.some((q) => q.text === question.text);
  }

  function getSubquestionsOf(question: Question): Question[] {
    const result = [];
    if (question.onYesQuestion) {
      result.push(question.onYesQuestion);
      result.push(...getSubquestionsOf(question.onYesQuestion));
    }

    if (question.onNoQuestion) {
      result.push(question.onNoQuestion);
      result.push(...getSubquestionsOf(question.onNoQuestion));
    }
    return result;
  }

  function calculateTestResult(
    answeredQuestions: Question[]
  ): [TestResult, string[], string[]] {
    const testResult = calculateResult(answeredQuestions);

    const testResultAdditionalWarningAndErrorMessages = answeredQuestions
      .filter(
        (q) =>
          (q.result === "Error" || q.result === "Warning") &&
          q.resultMessage != null
      )
      .map((q) => q.resultMessage!);

    const testResultAdditionalSuccessMessages = answeredQuestions
      .filter((q) => q.result === "Success" && q.resultMessage != null)
      .map((q) => q.resultMessage!);

    return [
      testResult,
      testResultAdditionalWarningAndErrorMessages,
      testResultAdditionalSuccessMessages,
    ];
  }

  function calculateResult(questions: Question[]): Result {
    return questions.some((q) => q.result === "Error")
      ? "Error"
      : questions.some((q) => q.result === "Warning")
      ? "Warning"
      : "Success";
  }
}

export function questionError(question: Question, answer: YesNoAnswer) {
  return (
    (answer === "Yes" && question.onYes.result === "Error") ||
    (answer === "No" && question.onNo.result === "Error")
  );
}
