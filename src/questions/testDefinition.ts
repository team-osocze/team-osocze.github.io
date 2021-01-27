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
          text: "Czy jest Pan/Pani w wieku 18-65 lat?",
          onYes: { result: "Success" },
          onNo: { result: "Error" },
        },
        {
          type: "YesNo",
          text: "Czy waży Pan/Pani powyżej 50 kg?",
          onYes: { result: "Success" },
          onNo: { result: "Error" },
        },
        {
          type: "YesNo",
          text: "Czy choruje/chorował Pan/Pani na choroby przewlekłe, np. serca, płuc, nerek lub innych narządów?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek rozpoznano u Pana/Pani takie choroby jak: astma, padaczka, cukrzyca, łuszczyca, bielactwo, zawał serca, udar mózgu, nowotwór?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek chorował Pan/Pani na żółtaczkę?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy zażywa Pan/Pani regularnie jakiekolwiek leki (poza witaminami, antykoncepcją hormonalną i lekami na nadciśnienie)?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek miał/a Pan/Pani transfuzję krwi?",
          onYes: {
            result: "Warning",
            additionalMessage: "Z powodu transfuzji konieczne będą badania p/c antyHLA.",
          },
          onNo: { result: "Success" },
          info: "Jeśli tak, konieczne będą badania p/c antyHLA. Zapraszamy do RCKiK w Krakowie bądź Oddziału Terenowego w Małopolsce, wykonujemy je za darmo w czwartki i piątki.",
        },
        {
          type: "YesNo",
          text: "Czy kiedykolwiek była Pani w ciąży? (Wybierz NIE, jeśli pytanie Cię nie dotyczy)",
          onYes: {
            result: "Warning",
            additionalMessage: "Z powodu przebytej ciąży konieczne będą badania p/c antyHLA.",
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
          text: "Czy w ciągu ostatnich 6 miesięcy wykonano u Pana/Pani zabieg operacyjny, biopsję, gastroskopię, kolonoskopię, artroskopię, ekstrakcję zęba?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy zmieniał/a Pan/Pani partnera seksualnego?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 6 miesięcy wykonano u Pana/Pani:  zabiegi kosmetyczne z  przerwanie ciągłości skóry, makijaż permanentny, tatuaż, manicure lub pedicure, piercing?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
        },
        {
          type: "YesNo",
          text: "Czy w ciągu ostatnich 12 miesięcy przebywał/a Pan/Pani na terenach endemicznego występowania malarii lub innych chorób tropikalnych?",
          onYes: { result: "Error" },
          onNo: { result: "Success" },
          info: "Prosimy o sprawdzenie aktualnej sytuacji epidemiologicznej na stronie https://rckik.krakow.pl"
        },
        {
          type: "YesNo",
          text: "Czy przebywał/a Pan/Pani poza terenem Polski w ciągu ostatnich 30 dni?",
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
          text: "Czy chorował Pan/Pani na Covid-19 w ciągu ostatnich 3 miesięcy?",
          onYes: {
            result: "AnotherQuestion",
          },
          onYesQuestion: {
            type: "YesNo",
            text: "Czy zachorowanie na Covid-19 potwierdzono u Pana/Pani wymazem?",
            onYes: {
              result: "AnotherQuestion",
            },
            onYesQuestion: {
              type: "YesNo",
              text: "Czy minęło 14 dni od ustąpienia u Pana/Pani objawów COVID-19?",
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
              text: "Czy miał/a Pan/Pani wykonane badanie na obecność przeciwciał anty-SARS-CoV-2?",
              onYes: { result: "AnotherQuestion" },
              onYesQuestion: {
                type: "YesNo",
                text: "Czy wynik testu na przeciwciała był dodatni?",
                onYes: {
                  result: "AnotherQuestion",
                },
                onYesQuestion: {
                  type: "YesNo",
                  text: "Czy wystąpiły u Pana/Pani objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból pleców, biegunka?",
                  onYes: { result: "AnotherQuestion" },
                  onYesQuestion: {
                    type: "YesNo",
                    text: "Czy minęło 14 dni od ustąpienia u Pana/Pani objawów COVID-19?",
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
                      additionalMessage: "Uprzejmie prosimy po 14 dniach od ustąpienia objawów o ponowne uzupełnienie ankiety lub o kontakt telefoniczny z RCKiK.",
                    },
                  },
                },
                onNo: { result: "Error" },
              },
              onNo: { result: "AnotherQuestion" },
              onNoQuestion: {
                type: "YesNo",
                text: "Czy wystąpiły u Pana/Pani objawy typowe dla COVID-19 np. gorączka, kaszel, utrata węchu i smaku, ból pleców, biegunka?",
                onYes: { result: "AnotherQuestion" },
                onYesQuestion: {
                  type: "YesNo",
                  text: "Czy miał Pan/Pani kontakt z osobą z potwierdzonym zakażeniem COVID-19?",
                  onYes: {
                    result: "AnotherQuestion",
                  },
                  onYesQuestion: {
                    type: "YesNo",
                    text: "Czy minęło 14 dni od ustąpienia u Pana/Pani objawów COVID-19?",
                    onYes: {
                      result: "Success",
                      additionalMessage: "Objawy typowe dla COVID-19 i kontakt z osobą zakażoną.",
                    },
                    onNo: {
                      result: "Error",
                      additionalMessage: "Uprzejmie prosimy o ponowne wypełnienie ankiety po 14 dniach od ustąpienia objawów.",
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
