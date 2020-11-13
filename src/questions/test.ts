import { IQuestionGroup } from "./questionGroup";
import CovidGroup from "./covid";
import DiseasesGroup from "./diseases";
import MedicinesGroup from "./medicines";

export class Test {
  public questionGroups: IQuestionGroup[];

  constructor() {
    this.questionGroups = [
      new CovidGroup(),
      new DiseasesGroup(),
      new MedicinesGroup(),
    ];
  }
}
