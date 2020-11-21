export type YesNoAnswer = "Yes" | "No" | "NotApplicable";
export type QuestionType = "YesNo" | "Date";
export type TestResult = "Success" | "Error" | "Warning";

export const GeneralGroupHeader = "Ogólne";
export const CovidGroupHeader = "Covid";

export interface IQuestion {
  questionText: string;
  answeredCorrectly: boolean;
}
export interface IQuestionGroup {
  header: string;
  questions: IQuestion[];
  questionsNumber: number;
  allQuestionsCorrect: boolean | null;
}

export interface ITest {
  groups: IQuestionGroup[];
  isDone: boolean;
  numberOfAnsweredQuestions: number;
  numberOfAllQuestions: number;
  testResult: TestResult | null;
}

export function createTestState(): ITest {
  return {
    isDone: false,
    groups: [],
    numberOfAnsweredQuestions: 0,
    numberOfAllQuestions: 0,
    testResult: null,
  };
}

export const testState = createTestState();

export const initialState = createTestState();

const ANSWER_QUESTION_TYPE = "ANSWER_QUESTION";
const CREATE_GROUP_TYPE = "CREATE_GROUP";
const RESET_STATE_TYPE = "RESET_STATE";

type AnswerQuestionAction = {
  type: typeof ANSWER_QUESTION_TYPE;
  payload: {
    groupHeader: string;
    questionText: string;
    answeredCorrectly: boolean;
  };
};

type CreateGroupAction = {
  type: typeof CREATE_GROUP_TYPE;
  payload: {
    groupHeader: string;
    questionsNumber: number;
  };
};

type ResetAction = {
  type: typeof RESET_STATE_TYPE;
};

export function answerQuestionAction(
  groupHeader: string,
  questionText: string,
  answeredCorrectly: boolean
): AnswerQuestionAction {
  return {
    type: ANSWER_QUESTION_TYPE,
    payload: {
      groupHeader,
      questionText,
      answeredCorrectly,
    },
  };
}

export function createGroupAction(
  groupHeader: string,
  questionsNumber: number
): CreateGroupAction {
  return {
    type: CREATE_GROUP_TYPE,
    payload: {
      groupHeader,
      questionsNumber,
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
  action: AnswerQuestionAction | ResetAction | CreateGroupAction
): ITest {
  switch (action.type) {
    case ANSWER_QUESTION_TYPE:
      return onAnswer(
        state,
        action.payload.groupHeader,
        action.payload.questionText,
        action.payload.answeredCorrectly
      );
    case CREATE_GROUP_TYPE:
      return createGroup(
        state,
        action.payload.groupHeader,
        action.payload.questionsNumber
      );
    case RESET_STATE_TYPE:
      return createTestState();
    default:
      throw new Error();
  }
}

function createGroup(
  current: ITest,
  groupHeader: string,
  questionsNumber: number
): ITest {
  const group = current.groups.find((g) => g.header === groupHeader);
  let groups: IQuestionGroup[];

  if (group) {
    groups = current.groups;
  } else {
    groups = [
      ...current.groups,
      {
        header: groupHeader,
        questions: [],
        questionsNumber: questionsNumber,
        allQuestionsCorrect: null,
      },
    ];
  }

  return {
    groups: groups,
    isDone: current.isDone,
    testResult: current.testResult,
    numberOfAnsweredQuestions: current.numberOfAnsweredQuestions,
    numberOfAllQuestions: groups
      .map((g) => g.questionsNumber)
      .reduce((a, b) => a + b),
  };
}

function onAnswer(
  current: ITest,
  groupHeader: string,
  questionText: string,
  answeredCorrectly: boolean
): ITest {
  const groups: IQuestionGroup[] = current.groups.map((g) => {
    if (g.header === groupHeader) {
      const questions: IQuestion[] = g.questions.map((q) => {
        if (q.questionText === questionText) {
          return {
            questionText: questionText,
            answeredCorrectly: answeredCorrectly,
          };
        } else {
          return q;
        }
      });
      return {
        header: g.header,
        questions: questions,
        questionsNumber: g.questionsNumber,
        allQuestionsCorrect:
          questions.length === g.questionsNumber
            ? questions.every((q) => q.answeredCorrectly)
            : null,
      };
    } else {
      return g;
    }
  });

  return {
    groups: groups,
    isDone: current.isDone,
    testResult: current.testResult,
    numberOfAnsweredQuestions: current.numberOfAnsweredQuestions,
    numberOfAllQuestions: current.numberOfAllQuestions,
  };
}
