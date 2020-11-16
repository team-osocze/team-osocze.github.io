import { IQuestion , QuestionGroup, YesNoAnswer, YesNoQuestion} from "./questionGroup";


export default class General extends QuestionGroup {
  public header = "Ogólne";
  public questions: IQuestion[] =  [
    new YesNoQuestion(
      "Czy jesteś w wieku 18 - 65 lat?",
      YesNoAnswer.Yes
    ),
    new YesNoQuestion(
      "Czy ważysz powyżej 50 kilogramów?",
      YesNoAnswer.Yes
    ),
    new YesNoQuestion(
      "Czy chorujesz przewlekle na choroby układu krążenia?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy chorujesz przewlekle na choroby układu oddechowego?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy chorujesz przewlekle na choroby nerek?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy chorujesz przewlekle na cukrzycę?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy chorujesz przewlekle na padaczkę?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) zabieg operacyjny?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) badanie endoskopowe?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy w ciągu ostatnich 6 miesięcy miałeś(-aś) wykonany tatuaż?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy kiedykolwiek miałeś(-aś) transfuzję krwi?",
      YesNoAnswer.No
    ),
    new YesNoQuestion(
      "Czy byłaś w ciąży?",
      YesNoAnswer.No,
      true
    )
  ];
}
