
export interface IQuestionGroup {
  header: string;
  questions: IQuestion[];
}
export interface IQuestion {
  text: string;
}

export class YesNoQuestion implements IQuestion {
  constructor(public text: string, public correctAnswer: YesNoAnswer) {}
}

export enum YesNoAnswer {
  Yes,
  No,
}
