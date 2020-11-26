export type YesNoAnswer = "Yes" | "No";
export type QuestionType = "YesNo" | "Date";
export type Result = "Success" | "Error" | "Warning" | "Empty";
export type TestResult = Result;
export type GroupResult = Result;
export type QuestionResult = Result | "AnotherQuestion";

export interface IQuestion {
  readonly type: QuestionType;
  readonly text: string;
  readonly onYes: QuestionResult;
  readonly onNo: QuestionResult;
  readonly additionalResultMessage?: string;
  readonly info?: string;
  readonly onYesQuestion?: IQuestion;
  readonly onNoQuestion?: IQuestion;
  answer: YesNoAnswer | null;
  result: QuestionResult | null;
}
export interface IQuestionGroup {
  readonly header: string;
  readonly questions: IQuestion[];
  result: GroupResult | null;
}

export interface ITest {
  readonly groups: IQuestionGroup[];
  isDone: boolean;
  numberOfAnsweredQuestions: number;
  numberOfAllQuestions: number;
  testResult: TestResult | null;
  testResultAdditionalMessages: string[];
}

export function createTestState(): ITest {
  const groups: IQuestionGroup[] = [
    {
      header: "Ogólny stan zdrowia",
      result: null,
      questions: [
        {
          type: "YesNo",
          text: "Czy masz więcej niż 65 lat?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy masz mniej niż 18 lat?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy ważysz mniej niż 50 kilogramów?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text:
            "Czy chorujsz na choroby układu krążenia, dolegliwości ze strony serca: zawał serca, duszności lub udar mózgu?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz na choroby skóry, wypryski/wysypkę, uczulenia, katar sienny lub astmę?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz na cukrzycę, choroby krwi, przedłużone krwawienie, choroby nerek, choroby nerwowe, padaczkę, nowotwór, choroby przewodu pokarmowego, choroby tarczycy lub zapalenie szpiku?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz lub chorowałeś na kiłę, rzeżączkę, toksoplazmozę, brucelozę, gruźlicę lub mononukleozę zakaźną?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy zażywasz regularnie jakiekolwiek leki?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 12 miesięcy byłeś za granicą? Szczególnie w krajach egzotycznych np. Zanzibar lub Tajlandia?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek miałeś transfuzję krwi?",
          onYes: "Warning",
          onNo: "Success",
          answer: null,
          result: null,
          info: "Jeśli tak, konieczne będą dodatkowe badania p/c anty HLA",
          additionalResultMessage:"Z powodu transfuzji, konieczne będą dodatkowe badania p/c anty HLA."
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek byłaś w ciąży? (Wybierz NIE jeśli pytanie Cię nie dotyczy)",
          onYes: "Warning",
          onNo: "Success",
          answer: null,
          result: null,
          info: "Jeśli tak, konieczne będą dodatkowe badania p/c anty HLA",
          additionalResultMessage:"Z powodu przebytej ciąży, konieczne będą dodatkowe badania p/c anty HLA."
        },
      ],
    },
    {
      header: "Czasowe wykluczenia",
      result: null,
      questions: [
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy miałeś jakikolwiek zabieg operacyjny, gastroskopię, kolonoskopię, biopsję, tatuaż, piercing lub mały zabieg u stomatologa? ",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy prowadziłeś diagnostykę z powodu choroby, tomografię komputerową lub rezonans magnetyczny? ",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy zmieniałeś partnera seksualnego?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy wykonywałeś zabiegi kosmetyczne z przebijaniem naskórka, makijaż permanentny, manicure lub pedicure?",
          onYes: "Error",
          onNo: "Success",
          answer: null,
          result: null,
        },
      ],
    },
    {
      header: "Kontakt z COVID-19",
      result: null,
      questions: [
        {
          type: "YesNo",
          text: "Czy masz potwierdzone zakażenie COVID-19 wymazem?",
          onYes: "AnotherQuestion",
          onYesQuestion: {
            type: "YesNo",
            text: "Czy minęło 28 dni od ustopienia u Ciebie objawów COVID-19 lub 18 dni od zakończenia izolacji?",
            onYes: "Success",
            onNo: "Error",
            answer: null,
            result: null,
            additionalResultMessage: "Uprzejmie prosimy o ponowne wykonanie testu po 28 dniach od ustopienia objawów lub 18 dni od zakończenia izolacji.",
          },
          onNo: "AnotherQuestion",
          onNoQuestion: {
            type: "YesNo",
            text: "Czy masz wykonane badanie na przeciwciała przeciwko wirusowi SARS-CoV-2?",
            onYes: "AnotherQuestion",
            onYesQuestion: {
              type: "YesNo",
              text: "Czy wynik testu na przeciwciała był dodatni?",
              onYes: "AnotherQuestion",
              onYesQuestion: {
                type: "YesNo",
                text: "Czy wystąpiły u Ciebie objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból pleców, biegunka?",
                onYes: "AnotherQuestion",
                onYesQuestion: {
                  type: "YesNo",
                  text: "Czy minęło 28 dni od ustąpienia u Ciebie objawów COVID-19?",
                  onYes: "Success",
                  onNo: "Warning",
                  answer: null,
                  result: null,
                  additionalResultMessage: "Uprzejmie prosimy o ponowne wykonanie testu po 28 dniach od ustąpienia u Ciebie objawów COVID-19.",
                },
                onNo: "AnotherQuestion",
                onNoQuestion: {
                  type: "YesNo",
                  text: "Czy minęło 14 dni od uzyskania dodatniego wyniku testu na przeciwciała?",
                  onYes: "Success",
                  onNo: "Error",
                  answer: null,
                  result: null,
                  additionalResultMessage: "Uprzejmie prosimy o ponowne wykonanie testu po 14 dniach od uzyskaina dodatniego wyniku testu na przeciwciała.",
                },
                answer: null,
                result: null,
              },
              onNo: "Error",
              answer: null,
              result: null,
            },
            onNo: "AnotherQuestion",
            onNoQuestion: {
              type: "YesNo",
              text: "Czy wystąpiły u Ciebie objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból głowy?",
              onYes: "AnotherQuestion",
              onYesQuestion: {
                type: "YesNo",
                text: "Czy miałeś kontakt z osobą z potwierdzonym zakażaniem COVID-19?",
                onYes: "AnotherQuestion",
                onYesQuestion: {
                  type: "YesNo",
                  text: "Czy minęło 28 dni od ustąpienia u Ciebie objawów COVID-19?",
                  onYes: "Success",
                  onNo: "Error",
                  answer: null,
                  result: null,
                  additionalResultMessage: "Uprzejmie prosimy o ponowne wykonanie testu po 28 dniach od ustąpienia u Ciebie objawów COVID-19.",
                },
                onNo: "Error",
                answer: null,
                result: null,
              },
              onNo: "Error",
              answer: null,
              result: null,
            },
            answer: null,
            result: null,
          },
          answer: null,
          result: null,
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
    testResultAdditionalMessages: [],
  };
}

export const testState = createTestState();
