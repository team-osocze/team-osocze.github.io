import { IQuestion , IQuestionGroup} from "./questionGroup";


export default class Diseases implements IQuestionGroup {
  public header = "Choroby";
  public questions: IQuestion[] = [];
}
