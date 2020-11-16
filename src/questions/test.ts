import { IQuestionGroup } from "./questionGroup";
import CovidGroup from "./covid";
import GeneralGroup from "./general";

export class Test {
  public questionGroups: IQuestionGroup[];

  constructor() {
    this.questionGroups = [new GeneralGroup(), new CovidGroup()];
  }

  public getResult() {
    const allQuestions = this.questionGroups.flatMap((g) => g.questions);

    return allQuestions.every((q) => q.getResult() === true);
  }

  public getProgress() {
    const allQuestions = this.questionGroups.flatMap((g) => g.questions);
    const answeredQuestions = allQuestions.filter((q) => q.isAnswered());

    return (answeredQuestions.length / allQuestions.length) * 100;
  }
}
