import { IQuestion , QuestionGroup} from "./questionGroup";

export default class Medicines extends QuestionGroup{
  public header = "Leki";
  public questions: IQuestion[] = [];
}
