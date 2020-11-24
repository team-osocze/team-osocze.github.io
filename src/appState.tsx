import {
  createTestState,
  IQuestion,
  IQuestionGroup,
  ITest,
  TestResult,
  YesNoAnswer,
} from "./questions/test";

export const initialState = createTestState();

const ANSWER_QUESTION_TYPE = "ANSWER_QUESTION";
const RESET_STATE_TYPE = "RESET_STATE";

type AnswerQuestionAction = {
  type: typeof ANSWER_QUESTION_TYPE;
  payload: {
    question: IQuestion;
    answer: YesNoAnswer;
  };
};

type ResetAction = {
  type: typeof RESET_STATE_TYPE;
};

export function answerQuestionAction(
  question: IQuestion,
  answer: YesNoAnswer
): AnswerQuestionAction {
  return {
    type: ANSWER_QUESTION_TYPE,
    payload: {
      question,
      answer,
    },
  };
}

export function resetStateAction(): ResetAction {
  return {
    type: RESET_STATE_TYPE,
  };
}

export function appStateReducer(
  state: ITest,
  action: AnswerQuestionAction | ResetAction
): ITest {
  switch (action.type) {
    case ANSWER_QUESTION_TYPE:
      return onAnswer(state, action.payload.question, action.payload.answer);
    case RESET_STATE_TYPE:
      return createTestState();
    default:
      throw new Error();
  }
}

function onAnswer(
  current: ITest,
  question: IQuestion,
  answer: YesNoAnswer
): ITest {
  const groups: IQuestionGroup[] = current.groups.map((g) => {
    if (containsQuestion(g, question)) {
      const questions = g.questions.map((q) => {
        return q.text === question.text
          ? {
              ...question,
              answer,
              answeredCorrectly: q.correctAnswer === answer,
              result:
                q.correctAnswer === answer
                  ? "Success"
                  : q.incorrectAnswerResult,
            }
          : q;
      });

      return {
        header: g.header,
        questions: questions,
        allQuestionsCorrect: questions.some((q) => q.answer === null)
          ? null
          : questions.every(
              (q) => q.result === "Success" || q.result === "Warning"
            ),
      };
    }
    return g;
  });

  const answeredQuestions = groups
    .flatMap((g) => g.questions)
    .filter((q) => q.answer !== null);

  let testResult: TestResult;
  let testResultAdditionalMessages: string;

  const errorQuestions = answeredQuestions.filter((q) => q.result === "Error");
  if (errorQuestions.length > 0) {
    testResult = "Error";
    testResultAdditionalMessages = errorQuestions
      .map((q) => q.additionalResultMessage)
      .join(",");
  } else {
    const warningQuestions = answeredQuestions.filter(
      (q) => q.result === "Warning"
    );
    if (warningQuestions.length > 0) {
      testResult = "Warning";
      testResultAdditionalMessages = warningQuestions
        .map((q) => q.additionalResultMessage)
        .join(",");
    } else {
      testResult = "Success";
      testResultAdditionalMessages = "";
    }
  }

  return {
    groups: groups,
    numberOfAllQuestions: current.numberOfAllQuestions,
    numberOfAnsweredQuestions: answeredQuestions.length,
    isDone:
      current.numberOfAllQuestions === answeredQuestions.length ||
      answeredQuestions.some((q) => q.result === "Error"),
    testResult: testResult,
    testResultAdditionalMessages: testResultAdditionalMessages,
  };

  function containsQuestion(group: IQuestionGroup, question: IQuestion) {
    return group.questions.some((q) => q.text === question.text);
  }
}
