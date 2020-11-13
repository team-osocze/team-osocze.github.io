import {
  IQuestion,
  YesNoAnswer,
  YesNoQuestion,
  IQuestionGroup,
} from "./questionGroup";

export default class CovidGroup implements IQuestionGroup {
  public header = "Covid info";
  public questions: IQuestion[] = [
    new YesNoQuestion(
      "Czy chorowałaś/eś na Covid-19 lub przechodziłeś zakażenie wirusem SARS-Cov-2 bezobjawowo?",
      YesNoAnswer.Yes
    ),
    new YesNoQuestion(
      "Czy objawy jakie wystąpiły w związku z Covid-19 ustąpiły i czujesz się zdrowy?",
      YesNoAnswer.Yes
    ),
  ];
}
