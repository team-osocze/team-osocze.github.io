export type YesNoAnswer = "Yes" | "No" | "NotApplicable";
export type QuestionType = "YesNo" | "Date";
export type TestResult = "Success" | "Error" | "Warning";
export type QuestionResult = "Success" | "Warning" | "Error";

export interface IQuestion {
  type: QuestionType;
  text: string;
  correctAnswer: YesNoAnswer;
  notAbblicableAvailable: boolean;
  answer: YesNoAnswer | null;
  incorrectAnswerResult: QuestionResult;
  additionalResultMessage?: string;
  info?: string;
  result: QuestionResult | null;
}
export interface IQuestionGroup {
  header: string;
  questions: IQuestion[];
  allQuestionsCorrect: boolean | null;
}

export interface ITest {
  testResultAdditionalMessages: string;
  groups: IQuestionGroup[];
  isDone: boolean;
  numberOfAnsweredQuestions: number;
  numberOfAllQuestions: number;
  testResult: TestResult | null;
}

export function createTestState(): ITest {
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
          result: null,
          info:
            "Za każdym razem, gdy oddajesz krew, oddajesz bogate w żelazo czerwone krwinki. Ponieważ młodzi ludzie wciąż się rozwijają, mają większe zapotrzebowanie na żelazo. Organizm zastępuje żelazo utracone w wyniku darowizny, wchłaniając więcej żelaza z pożywienia. Czas potrzebny dawcom na zastąpienie tego żelaza jest bardzo zróżnicowany - zależy to od rodzaju i ilości żelaza w diecie oraz od tego, czy występują inne straty żelaza.",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy ważysz powyżej 50 kilogramów?",
          correctAnswer: "Yes",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na choroby układu krążenia?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na choroby układu oddechowego?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na choroby nerek?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na cukrzycę?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz przewlekle na padaczkę?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) zabieg operacyjny?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) badanie endoskopowe?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) wykonany tatuaż?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek miałeś(-aś) transfuzję krwi?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          incorrectAnswerResult: "Warning",
          additionalResultMessage: "Transfuzja",
        },
        {
          type: "YesNo",
          text: "Czy byłaś w ciąży?",
          correctAnswer: "No",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Warning",
          additionalResultMessage: "Ciążą ",
        },
      ],
    },
    {
      header: "COVID",
      allQuestionsCorrect: null,
      questions: [
        {
          type: "YesNo",
          text: "Czy chorowałeś(-aś) na COVID?",
          correctAnswer: "Yes",
          notAbblicableAvailable: false,
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Error",
        },
      ],
    },
  ];

  return {
    isDone: false,
    groups: groups,
    numberOfAllQuestions: groups.flatMap((g) => g.questions).length,
    numberOfAnsweredQuestions: 0,
    testResult: null,
    testResultAdditionalMessages: "",
  };
}

export const testState = createTestState();
