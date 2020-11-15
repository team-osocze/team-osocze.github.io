import { IQuestion , QuestionGroup} from "./questionGroup";


export default class Diseases extends QuestionGroup {
  public header = "Choroby";
  public questions: IQuestion[] = [];
}
