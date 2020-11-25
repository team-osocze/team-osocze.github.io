export type YesNoAnswer = "Yes" | "No";
export type QuestionType = "YesNo" | "Date";
export type TestResult = "Success" | "Error" | "Warning";
export type QuestionResult = "Success" | "Warning" | "Error";

export interface IQuestion {
  type: QuestionType;
  text: string;
  correctAnswer: YesNoAnswer;
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
          text: "Czy jesteś starszy niż 65 lat?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy jesteś młodszy niż 18 lat?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy ważysz poniżej 50 kilogramów?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujsz na choroby układu krążenia, dolegliwości ze strony serca: zawał serca, duszność lub udar mózgu?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz na choroby skóry, wypryski/wysypka, uczulenia, katar sienny lub astmę?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz na cukrzycę, choroby krwi, przedłużone krwawienie, choroby nerek, choroby nerwowe, padaczkę, nowotwór, choroby przewodu pokarmowego, choroby tarczycy lub zapalenie szpiku?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy chorujesz lub chorowałeś na kiłę, rzeżączkę, toksoplazmozę, brucelozę, gruźlicę lub mononukleozę zakaźną?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy zażywasz regularnie jakiekolwiek leki? !!! KONIECZNE DSW",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 12 miesięcy byłeś granicą? Szczególnie w krajach egzotycznych np. Zanzibar lub Tajlandia?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "",
          incorrectAnswerResult: "Error",
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek miałeś transfuzję krwi?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "Jeśli tak, konieczne będą dodatkowe badania p/c anty HLA",
          incorrectAnswerResult: "Warning",
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek byłaś w ciąży? (Wybierz NIE jeśli pytanie Cię nie dotyczy)",
          correctAnswer: "No",
          answer: null,
          result: null,
          info:  "Jeśli tak, konieczne będą dodatkowe badania p/c anty HLA",
          incorrectAnswerResult: "Warning",
        }
      ],
    },      
    {
      header: "W ostatnim czasie",
      allQuestionsCorrect: null,
      questions: [
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy miałeś jakikolwiek zabieg operacyjny, gastroskopię, kolonoskopię, biopsję, tatuaż, piercing lub mały zabieg u stomatologa? ",
          correctAnswer: "No",
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Error", 
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy prowadziłeś diagnostykę z powodu choroby, tomografię komputerową lub rezonans magnetyczny? ",
          correctAnswer: "No",
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Error", 
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy zmieniałeś partnera seksualnego?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Error", 
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy wykonywałeś zabiegi kosmetyczne z przebijaniem naskórka, makijaż permanentny, manicure lub pedicure?",
          correctAnswer: "No",
          answer: null,
          result: null,
          info: "",
          incorrectAnswerResult: "Error", 
        }
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
