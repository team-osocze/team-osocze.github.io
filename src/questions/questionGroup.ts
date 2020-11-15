export interface IQuestionGroup {
  header: string;
  questions: IQuestion[];
  getAnswers(): Map<IQuestion, boolean | null>;
}

export abstract class QuestionGroup implements IQuestionGroup {
  abstract header: string;
  abstract questions: IQuestion[];
  getAnswers(): Map<IQuestion, boolean | null> {
    return new Map<IQuestion, boolean | null>(
      this.questions.map((q) => [q, q.getResult()])
    );
  }
}
export interface IQuestion {
  text: string;
  getResult(): boolean | null;
}

export class YesNoQuestion implements IQuestion {
  private answer: YesNoAnswer | null = null;
  constructor(public text: string, public correctAnswer: YesNoAnswer) {}

  public setAnswer(answer: YesNoAnswer) {
    this.answer = answer;
  }
  public getAnswer(){
    return this.answer;
  }

  public getResult() {
    if(this.answer===null)
      return null;

    return this.answer === this.correctAnswer;
  }
}

export enum YesNoAnswer {
  Yes,
  No,
}
