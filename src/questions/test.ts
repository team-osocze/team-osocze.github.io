export type YesNoAnswer = "Yes" | "No" | "NotApplicable";
export type QuestionType = "YesNo" | "Date";
export type TestResult = "Success" | "Error" | "Warning";
export interface IQuestion {
  type: QuestionType;
  text: string;
  correctAnswer: YesNoAnswer;
  notAbblicableAvailable: boolean;
  answer: YesNoAnswer | null;
  answeredCorrectly: boolean | null;
}
export interface IQuestionGroup {
  header: string;
  questions: IQuestion[];
  allQuestionsCorrect: boolean | null;
}

//questions:
//how to do this to not initlaize answer etc with null
//maybe test definiction should be separate to test answers?
export interface ITest {
  groups: IQuestionGroup[];
  isDone: boolean;
  numberOfAnsweredQuestions: number;
  numberOfAllQuestions: number;
  testResult: TestResult | null;
}

export function createTestState() : ITest{
  const groups: IQuestionGroup[] = [
    {
      header: "Ogólne",
      allQuestionsCorrect: null,
      questions: [
        {
          type: "YesNo",
          text: "Czy jesteś w wieku 18 - 65 lat?",
          correctAnswer: "Yes",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy ważysz powyżej 50 kilogramów?",
          correctAnswer: "Yes",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na choroby układu krążenia?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na choroby układu oddechowego?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na choroby nerek?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na cukrzycę?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na padaczkę?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) zabieg operacyjny?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) badanie endoskopowe?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) wykonany tatuaż?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek miałeś(-aś) transfuzję krwi?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          answeredCorrectly: null,
        },
        {
          type: "YesNo",
          text: "Czy byłaś w ciąży?",
          correctAnswer: "No",
          notAbblicableAvailable: true,
          answer: null,
          answeredCorrectly: null,
        },
      ],
    },
    { header: "COVID", allQuestionsCorrect: null, questions: [
      {
        type: "YesNo",
        text: "Czy chorowałeś(-aś) na COVID?",
        correctAnswer: "Yes",
        notAbblicableAvailable: false,
        answer: null,
        answeredCorrectly: null,
      },
    ] },
  ];
  
  return {
    isDone: false,
    groups: groups,
    numberOfAllQuestions: groups.flatMap((g) => g.questions).length,
    numberOfAnsweredQuestions: 0,
    testResult: null,
  };  
};

export const testState = createTestState();