import {
  IQuestion,
  YesNoAnswer,
  YesNoQuestion,
  QuestionGroup,
} from "./questionGroup";

export default class CovidGroup extends QuestionGroup {
  public header = "Covid info";
  public questions: IQuestion[] = [
    new YesNoQuestion(
      "Czy przechodziłeś(-aś) zakażenie wirusem SARS-Cov2 bezobjawowo?",
      YesNoAnswer.Yes
    ),
  ];
}
