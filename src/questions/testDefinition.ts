export type YesNoAnswer = "Yes" | "No";
export type QuestionType = "YesNo" | "Date";
export type Result = "Success" | "Error" | "Warning";
export type TestResult = Result;
export type GroupResult = Result;
export type QuestionResult = Result | "AnotherQuestion";

export type QuestionAction = {
  result: QuestionResult;
  additionalMessage?: string;
};

export interface Question {
  readonly type: QuestionType;
  readonly text: string;
  readonly onYes: QuestionAction;
  readonly onNo: QuestionAction;
  readonly info?: string;
  readonly onYesQuestion?: Question;
  readonly onNoQuestion?: Question;
  answer?: YesNoAnswer;
  result?: QuestionResult;
  resultMessage?: string;
}
export interface QuestionGroup {
  readonly header: string;
  readonly questions: Question[];
  result?: GroupResult | null;
}

export interface Test {
  readonly groups: QuestionGroup[];
  isDone: boolean;
  numberOfAnsweredQuestions: number;
  numberOfAllQuestions: number;
  result: TestResult | null;
  resultWarningAndErrorMessages: string[];
  resultSuccessMessages: string[];
}

export function createTestState(): Test {
  const groups: QuestionGroup[] = [
    {
      header: "Ogólny stan zdrowia",
      questions: [
        {
          type: "YesNo",
          text: "Czy jesteś w wieku 18-65 lat?",
          onYes: { result: "Success" },
          onNo: { result: "Error" },
        },
        {
          type: "YesNo",
          text: "Czy ważysz powyżej 50 kg?",
          onYes: { result: "Success" },
          onNo: { result: "Error" },
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz lub chorowałeś/aś na choroby układu krążenia, dolegliwości ze strony serca: zawał serca, duszności lub udar mózgu?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz na choroby skóry, wypryski/wysypkę, łuszczycę, uczulenia, katar sienny lub astmę?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz na cukrzycę, choroby krwi, przedłużone krwawienie, choroby nerek, choroby nerwowe, padaczkę, nowotwór, choroby przewodu pokarmowego, choroby tarczycy lub zapalenie szpiku?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy chorujesz lub chorowałeś na kiłę, rzeżączkę, toksoplazmozę, brucelozę, gruźlicę lub mononukleozę zakaźną?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy zażywasz regularnie jakiekolwiek leki (poza witaminami, antykoncepcją hormonalną i lekami na nadciśnienie)?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 12 miesięcy byłeś/aś za granicą? Szczególnie w krajach egzotycznych np. Zanzibar lub Tajlandia?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek miałeś/aś transfuzję krwi?",
          onYes: {
            result: "Warning",
            additionalMessage:
              "Z powodu transfuzji konieczne będą badania p/c antyHLA.",
          },
          onNo: { result: "Success" },

          info: "Jeśli tak, konieczne będą badania p/c antyHLA. Zapraszamy do RCKiK w Krakowie bądź Oddziału Terenowego w Małopolsce, wykonujemy je za darmo w czwartki i piątki.",
        },
        {
          type: "YesNo",
          text:
            "Czy kiedykolwiek byłaś w ciąży? (Wybierz NIE jeśli pytanie Cię nie dotyczy)",
          onYes: {
            result: "Warning",
            additionalMessage:
              "Z powodu przebytej ciąży konieczne będą badania p/c antyHLA.",
          },
          onNo: { result: "Success" },
          info: "Jeśli tak, konieczne będą badania p/c antyHLA. Zapraszamy do RCKiK w Krakowie bądź Oddziału Terenowego w Małopolsce, wykonujemy je za darmo w czwartki i piątki.",
        },
      ],
    },
    {
      header: "Czasowe wykluczenia",
      questions: [
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy miałeś/aś jakikolwiek zabieg operacyjny, gastroskopię, kolonoskopię, biopsję, tatuaż, piercing lub mały zabieg u stomatologa? ",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy prowadziłeś/aś diagnostykę z powodu choroby, tomografię komputerową lub rezonans magnetyczny? ",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy zmieniałeś/aś partnera seksualnego?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy wykonywałeś/aś zabiegi kosmetyczne z przebijaniem naskórka, makijaż permanentny, manicure lub pedicure?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text:
            "Czy w ciągu ostatnich 6 miesięcy byłeś/aś biorcą przeszczepu?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
      ],
    },
    {
      header: "Kontakt z COVID-19",
      questions: [
        {
          type: "YesNo",
          text: "Czy zachorowałeś/aś na Covid-19 w ciągu ostatnich 3 miesięcy?",
          onYes: {
            result: "AnotherQuestion",
          },
          onYesQuestion: {
            type: "YesNo",
            text: "Czy zachorowanie na Covid-19 masz potwierdzone wymazem?",
            onYes: {
              result: "AnotherQuestion",
            },
            onYesQuestion: {
              type: "YesNo",
              text: "Czy minęło 14 dni od ustąpienia u Ciebie objawów COVID-19?",
              onYes: {
                result: "Success",
                additionalMessage: "Zakażenie COVID-19 potwierdzone wymazem.",
              },
              onNo: {
                result: "Error",
                additionalMessage:
                  "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia u Ciebie objawów COVID-19.",
              },
            },
            onNo: { result: "AnotherQuestion" },
            onNoQuestion: {
              type: "YesNo",
              text: "Czy miałeś/aś wykonane badanie na obecność przeciwciał anty-SARS-CoV-2?",
              onYes: { result: "AnotherQuestion" },
              onYesQuestion: {
                type: "YesNo",
                text: "Czy wynik testu na przeciwciała był dodatni?",
                onYes: {
                  result: "AnotherQuestion",
                },
                onYesQuestion: {
                  type: "YesNo",
                  text:
                    "Czy wystąpiły u Ciebie objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból pleców, biegunka?",
                  onYes: { result: "AnotherQuestion" },
                  onYesQuestion: {
                    type: "YesNo",
                    text:
                      "Czy minęło 14 dni od ustąpienia u Ciebie objawów COVID-19?",
                    onYes: {
                      result: "Success",
                      additionalMessage:
                        "Obecność przeciwciał CoV-2 potwierdzona testem.",
                    },
                    onNo: {
                      result: "Warning",
                      additionalMessage:
                        "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia u Ciebie objawów COVID-19.",
                    },
                  },
                  onNo: { result: "AnotherQuestion" },
                  onNoQuestion: {
                    type: "YesNo",
                    text:
                      "Czy minęło 14 dni od uzyskania dodatniego wyniku testu na przeciwciała?",
                    onYes: {
                      result: "Success",
                      additionalMessage:
                        "Obecność przeciwciał CoV-2 potwierdzona testem.",
                    },
                    onNo: {
                      result: "Error",
                      additionalMessage:
                        "Uprzejmie prosimy po 14 dniach od ustąpienia objawów o ponowne uzupełnienie ankiety lub o kontakt telefoniczny z RCKiK.",
                    },
                  },
                },
                onNo: { result: "Error" },
              },
              onNo: { result: "AnotherQuestion" },
              onNoQuestion: {
                type: "YesNo",
                text:
                  "Czy wystąpiły u Ciebie objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból głowy?",
                onYes: { result: "AnotherQuestion" },
                onYesQuestion: {
                  type: "YesNo",
                  text:
                    "Czy miałeś/aś kontakt z osobą z potwierdzonym zakażeniem COVID-19?",
                  onYes: {
                    result: "AnotherQuestion",
                  },
                  onYesQuestion: {
                    type: "YesNo",
                    text:
                      "Czy minęło 14 dni od ustąpienia u Ciebie objawów COVID-19?",
                    onYes: {
                      result: "Success",
                      additionalMessage:
                        "Objawy typowe dla COVID-19 i kontakt z osobą zakażoną.",
                    },
                    onNo: {
                      result: "Error",
                      additionalMessage:
                        "Uprzejmie prosimy po 14 dniach od ustąpienia objawów o ponowne uzupełnienie ankiety lub o kontakt telefoniczny z RCKiK.",
                    },
                  },
                  onNo: { result: "Error" },
                },
                onNo: { result: "Error" },
              },
            },
          },
          onNo: { result: "Error" },
        }
      ],
    },
  ];

  return {
    isDone: false,
    groups: groups,
    numberOfAllQuestions: groups.flatMap((g) => g.questions).length,
    numberOfAnsweredQuestions: 0,
    result: null,
    resultWarningAndErrorMessages: [],
    resultSuccessMessages: [],
  };
}

export const testState = createTestState();
