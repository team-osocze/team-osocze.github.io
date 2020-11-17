import { createTestState, IQuestion, IQuestionGroup, ITest, YesNoAnswer } from "./questions/test";

export const initialState = createTestState();

const ANSWER_QUESTION_TYPE = "ANSWER_QUESTION";
const RESET_STATE_TYPE = "RESET_STATE";

type AnswerQuestionAction = {
    type: typeof ANSWER_QUESTION_TYPE;
    payload: {
        question: IQuestion;
        answer: YesNoAnswer;
    }
}

type ResetState = {
    type: typeof RESET_STATE_TYPE;
}

export function answerQuestionAction(question: IQuestion, answer: YesNoAnswer): AnswerQuestionAction {
    return {
        type: ANSWER_QUESTION_TYPE,
        payload: {
            question, answer
        }
    }
}

export function resetStateAction(): ResetState {
    return {
        type: RESET_STATE_TYPE
    }
}

export function appStateReducer(state: ITest, action: AnswerQuestionAction | ResetState): ITest {
    switch (action.type) {
        case ANSWER_QUESTION_TYPE:
          return onAnswer(state, action.payload.question, action.payload.answer);
        case RESET_STATE_TYPE:
          return createTestState();
        default:
          throw new Error();
      }
}

function onAnswer(current: ITest, question: IQuestion, answer: YesNoAnswer): ITest {
    const groups: IQuestionGroup[] = current.groups.map(g => {
        if (containsQuestion(g, question)) {
          const questions = g.questions.map(q => {
            return q.text === question.text ? { 
              ...question,
              answer,
              answeredCorrectly: q.correctAnswer === answer
            } : q;
          })

          return {
            header: g.header,
            questions: questions,
            allQuestionsCorrect: questions.some((q) => q.answer === null)
              ? null
              : questions.every((q) => q.answeredCorrectly === true),
          };
        }
        return g;
      });

      const answeredQuestions = groups
        .flatMap((g) => g.questions)
        .filter((q) => q.answer !== null);

      return {
        groups: groups,
        numberOfAllQuestions: current.numberOfAllQuestions,
        numberOfAnsweredQuestions: answeredQuestions.length,
        isDone:
          current.numberOfAllQuestions === answeredQuestions.length ||
          answeredQuestions.some((q) => q.answeredCorrectly === false),
        testResult: groups.every((g) => g.allQuestionsCorrect)
          ? "Success"
          : "Error",
      };

    function containsQuestion(group: IQuestionGroup, question: IQuestion) {
      return group.questions.some((q) => q.text === question.text);
    }
  }