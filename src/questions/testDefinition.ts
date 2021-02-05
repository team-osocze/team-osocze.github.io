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
          text: "Czy chorujesz/chorowałeś/chorowałaś na choroby przewlekłe, np. serca, płuc, nerek lub innych narządów?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek rozpoznano u Ciebie takie choroby jak: astma, padaczka, cukrzyca, łuszczyca, bielactwo, zawał serca, udar mózgu, nowotwór?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek chorowałeś/chorowałaś na żółtaczkę?",
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
          text: "Czy kiedykolwiek miałeś/miałaś transfuzję krwi?",
          onYes: {
            result: "Warning",
            additionalMessage: "Z powodu transfuzji konieczne będą badania p/c antyHLA.",
          },
          onNo: { result: "Success" },
          info: "Jeśli tak, konieczne będzie badanie przeciwciał anty-HLA. Aby wykonać takie badanie zapraszamy do RCKiK w Krakowie lub Terenowego Oddziału w czwartek lub piątek.",
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek byłaś w ciąży? (Wybierz NIE, jeśli pytanie Cię nie dotyczy)",
          onYes: {
            result: "Warning",
            additionalMessage: "Z powodu przebytej ciąży konieczne będą badania p/c antyHLA.",
          },
          onNo: { result: "Success" },
          info: "Jeśli tak, konieczne będzie badanie przeciwciał anty-HLA. Aby wykonać takie badanie zapraszamy do RCKiK w Krakowie lub Terenowego Oddziału w czwartek lub piątek.",
        },
      ],
    },
    {
      header: "Czasowe wykluczenia",
      questions: [
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy wykonano u Ciebie zabieg operacyjny, biopsję, gastroskopię, kolonoskopię, artroskopię, ekstrakcję zęba?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy zmieniałeś/zmieniałaś partnera seksualnego?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy byłeś/byłaś biorcą przeszczepu?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy wykonano u Ciebie: zabiegi kosmetyczne z  przerwaniem ciągłości skóry, makijaż permanentny, tatuaż, manicure lub pedicure, piercing?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 12 miesięcy przebywałeś/przebywałaś na terenach endemicznego występowania malarii lub innych chorób tropikalnych ",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
          info: "Prosimy o sprawdzenie aktualnej sytuacji epidemiologicznej na stronie https://rckik.krakow.pl"
        },
        {
          type: "YesNo",
          text: "Czy przebywałeś/przebywałaś poza terenem Polski w ciągu ostatnich 30 dni?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
          info: "Prosimy o sprawdzenie aktualnej sytuacji epidemiologicznej na stronie https://rckik.krakow.pl"
        },
      ],
    },
    {
      header: "Kontakt z COVID-19",
      questions: [
        {
          type: "YesNo",
          text: "Czy chorowałeś/chorowałaś na Covid-19 w ciągu ostatnich 3 miesięcy?",
          onYes: {
            result: "AnotherQuestion",
          },
          onYesQuestion: {
            type: "YesNo",
            text: "Czy zachorowanie na Covid-19 potwierdzono u Ciebie wymazem?",
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
                additionalMessage: "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia objawów COVID-19.",
              },
            },
            onNo: { result: "AnotherQuestion" },
            onNoQuestion: {
              type: "YesNo",
              text: "Czy miałeś/miałaś wykonane badanie na obecność przeciwciał anty-SARS-CoV-2?",
              onYes: { result: "AnotherQuestion" },
              onYesQuestion: {
                type: "YesNo",
                text: "Czy wynik testu na przeciwciała był dodatni?",
                onYes: {
                  result: "AnotherQuestion",
                },
                onYesQuestion: {
                  type: "YesNo",
                  text: "Czy wystąpiły u Ciebie objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból pleców, biegunka?",
                  onYes: { result: "AnotherQuestion" },
                  onYesQuestion: {
                    type: "YesNo",
                    text: "Czy minęło 14 dni od ustąpienia u Ciebie objawów COVID-19?",
                    onYes: {
                      result: "Success",
                      additionalMessage: "Obecność przeciwciał CoV-2 potwierdzona badaniem na obecność przeciwciał anty-SARS-CoV-2.",
                    },
                    onNo: {
                      result: "Warning",
                      additionalMessage: "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia objawów COVID-19.",
                    },
                  },
                  onNo: { result: "AnotherQuestion" },
                  onNoQuestion: {
                    type: "YesNo",
                    text: "Czy minęło 14 dni od uzyskania dodatniego wyniku testu na przeciwciała?",
                    onYes: {
                      result: "Success",
                      additionalMessage: "Obecność przeciwciał CoV-2 potwierdzona badaniem na obecność przeciwciał anty-SARS-CoV-2.",
                    },
                    onNo: {
                      result: "Error",
                      additionalMessage: "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia objawów COVID-19.",
                    },
                  },
                },
                onNo: { result: "Error" },
              },
              onNo: { result: "AnotherQuestion" },
              onNoQuestion: {
                type: "YesNo",
                text: "Czy wystąpiły u Ciebie objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból pleców, biegunka?",
                onYes: { result: "AnotherQuestion" },
                onYesQuestion: {
                  type: "YesNo",
                  text: "Czy miałeś/miałaś kontakt z osobą z potwierdzonym zakażeniem COVID-19?",
                  onYes: {
                    result: "AnotherQuestion",
                  },
                  onYesQuestion: {
                    type: "YesNo",
                    text: "Czy minęło 14 dni od ustąpienia u Ciebie objawów COVID-19?",
                    onYes: {
                      result: "Success",
                      additionalMessage: "Objawy typowe dla COVID-19 i kontakt z osobą zakażoną.",
                    },
                    onNo: {
                      result: "Error",
                      additionalMessage: "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia objawów COVID-19.",
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
