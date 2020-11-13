import { IQuestion , IQuestionGroup} from "./questionGroup";

export default class Medicines implements IQuestionGroup {
  public header = "Leki";
  public questions: IQuestion[] = [];
}
