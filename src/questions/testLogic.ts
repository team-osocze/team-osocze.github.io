import {
  IQuestion,
  IQuestionGroup,
  ITest,
  Result,
  TestResult,
  YesNoAnswer,
} from "./testDefinition";

export function onAnswer(
  current: ITest,
  question: IQuestion,
  answer: YesNoAnswer
): ITest {
  const subQuestions = getSubquestionsOf(question);

  const groups: IQuestionGroup[] = current.groups.map((group) => {
    if (containsQuestion(group.questions, question)) {
      const questions: IQuestion[] = [];
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
            if (q.onYes === "AnotherQuestion") {
              questions.push({
                ...q,
                answer,
                result: "Success",
              });

              questions.push({
                ...q.onYesQuestion!,
              });
            } else {
              questions.push({
                ...q,
                answer,
                result: q.onYes,
              });
            }
            break;
          case "No":
            if (q.onNo === "AnotherQuestion") {
              questions.push({
                ...q,
                answer,
                result: "Success",
              });

              questions.push({
                ...q.onNoQuestion!,
              });
            } else {
              questions.push({
                ...q,
                answer,
                result: q.onNo,
              });
            }
            break;
        }
      }

      return {
        ...group,
        questions,
        result: questions.some((q) => q.answer === null)
          ? null
          : calculateResult(questions),
      };
    }
    return group;
  });

  const allQuestions = groups.flatMap((g) => g.questions);
  const answeredQuestions = allQuestions.filter((q) => q.answer !== null);

  const [testResult, testResultAdditionalMessages] = calculateTestResult(
    answeredQuestions
  );

  return {
    groups,
    numberOfAllQuestions: allQuestions.length,
    numberOfAnsweredQuestions: answeredQuestions.length,
    isDone:
      current.numberOfAllQuestions === answeredQuestions.length ||
      testResult === "Error",
    testResult,
    testResultAdditionalMessages,
  };

  function containsQuestion(questions: IQuestion[], question: IQuestion) {
    return questions.some((q) => q.text === question.text);
  }

  function getSubquestionsOf(question: IQuestion): IQuestion[] {
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
    answeredQuestions: IQuestion[]
  ): [TestResult, string[]] {
    const testResult = calculateResult(answeredQuestions);

    const additionalResultMessages =
      testResult === "Success"
        ? []
        : answeredQuestions
            .filter((q) => q.result === testResult && q.additionalResultMessage)
            .map((q) => q.additionalResultMessage!);

    return [testResult, additionalResultMessages];
  }

  function calculateResult(questions: IQuestion[]): Result {
    return questions.some((q) => q.result === "Error")
      ? "Error"
      : questions.some((q) => q.result === "Warning")
      ? "Warning"
      : "Success";
  }
}

export function questionError(question: IQuestion, answer: YesNoAnswer) {
  return (
    (answer === "Yes" && question.onYes === "Error") ||
    (answer === "No" && question.onNo === "Error")
  );
}
