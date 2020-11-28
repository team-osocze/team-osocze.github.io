import {
  createTestState,
  Question,
  Test,
  YesNoAnswer,
} from "./questions/testDefinition";
import { onAnswer } from "./questions/testLogic";

export const initialState = createTestState();

const ANSWER_QUESTION_TYPE = "ANSWER_QUESTION";
const RESET_STATE_TYPE = "RESET_STATE";

type AnswerQuestionAction = {
  type: typeof ANSWER_QUESTION_TYPE;
  payload: {
    question: Question;
    answer: YesNoAnswer;
  };
};

type ResetAction = {
  type: typeof RESET_STATE_TYPE;
};

export function answerQuestionAction(
  question: Question,
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
  state: Test,
  action: AnswerQuestionAction | ResetAction
): Test {
  switch (action.type) {
    case ANSWER_QUESTION_TYPE:
      return onAnswer(state, action.payload.question, action.payload.answer);
    case RESET_STATE_TYPE:
      return createTestState();
    default:
      throw new Error();
  }
}
