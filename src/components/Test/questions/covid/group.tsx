import React from "react";
import QuestionGroup from "../../questionGroupComponent";

interface IProps {
  isLastGroup: boolean;
  isExpanded: (header: string) => boolean;
  onToggleGroup: (header: string) => void;
  onNext?: () => void;
}

const groupHeader = "Covid";

const GeneralQuestionsGroup: React.FC<IProps> = (props: IProps) => {
  return (<></>
    // <QuestionGroup
    //   header={groupHeader}
    //   isLastGroup={props.isLastGroup}
    //   isExpanded={props.isExpanded}
    //   onToggleGroup={props.onToggleGroup}
    //   onNext={props.onNext}
    //   group={
    // ></QuestionGroup>
  );
};

export default GeneralQuestionsGroup;
