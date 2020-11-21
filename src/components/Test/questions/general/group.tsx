import React, { useEffect } from "react";
import QuestionGroup from "../../questionGroupComponent";
import YesNoQuestionComponent from "../../yesNoQuestionComponent";
import { ITest } from "../../../../appState";

interface IProps {
  isLastGroup: boolean;
  isExpanded: (header: string) => boolean;
  onToggleGroup: (header: string) => void;
  onNext: () => void;
  onAnswer: (
    groupHeader: string,
    questionText: string,
    answeredCorrectly: boolean
  ) => void;
  onGroupCreated: (groupHeader: string, questionsNumber: number) => void;
  testState: ITest;
}

const groupHeader = "Ogólne";
const questionsNumber = 13;

const GeneralQuestionsGroup: React.FC<IProps> = (props: IProps) => {
  function onAnswer(questionText: string, answeredCorrectly: boolean) {
    props.onAnswer(groupHeader, questionText, answeredCorrectly);
  }
  useEffect(() => {
    props.onGroupCreated(groupHeader, questionsNumber);
  }, []);

  return (
    <QuestionGroup
      header={groupHeader}
      isLastGroup={props.isLastGroup}
      isExpanded={props.isExpanded}
      onToggleGroup={props.onToggleGroup}
      onNext={props.onNext}
      group={props.testState.groups.find((g) => g.header === groupHeader)}
    >
      <YesNoQuestionComponent
        text={"Czy jesteś w wieku 18 - 65 lat?"}
        info={
          "Za każdym razem, gdy oddajesz krew, oddajesz bogate w żelazo czerwone krwinki. Ponieważ młodzi ludzie wciąż się rozwijają, mają większe zapotrzebowanie na żelazo. Organizm zastępuje żelazo utracone w wyniku darowizny, wchłaniając więcej żelaza z pożywienia. Czas potrzebny dawcom na zastąpienie tego żelaza jest bardzo zróżnicowany - zależy to od rodzaju i ilości żelaza w diecie oraz od tego, czy występują inne straty żelaza."
        }
        correctAnswer={"Yes"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy ważysz powyżej 50 kilogramów?"}
        info={""}
        correctAnswer={"Yes"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy chorujesz przewlekle na choroby układu krążenia?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy chorujesz przewlekle na choroby układu oddechowego?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy chorujesz przewlekle na choroby nerek?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy chorujesz przewlekle na cukrzycę?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy chorujesz przewlekle na padaczkę?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) zabieg operacyjny?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={
          "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) badanie endoskopowe?"
        }
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) wykonany tatuaż?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy kiedykolwiek miałeś(-aś) transfuzję krwi?"}
        info={""}
        correctAnswer={"No"}
        onAnswer={onAnswer}
      />
      <YesNoQuestionComponent
        text={"Czy byłaś w ciąży?"}
        info={""}
        correctAnswer={"No"}
        notAbblicableAvailable={true}
        onAnswer={onAnswer}
      />
    </QuestionGroup>
  );
};

export default GeneralQuestionsGroup;
