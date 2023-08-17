import {Component} from "@angular/core";
import {iCondition} from "../../interfaces/iCondition";

@Component({
  selector: "select-options-bar",
  templateUrl:"./select_options_bar.component.html",
  styleUrls:["./select_options_bar.component.sass"]
})

export class SelectOptionsBar{
  conditionArray: iCondition[]=[{
    column: 'Столбец 1',
    condition: "=",
    value:"",
    not: false
  }]

  public addNewCondition():void{
    if(this.conditionArray.length>5) return
    const condition=this.conditionArray[this.conditionArray.length-1]
    this.conditionArray.push(condition)
  }

  public deleteCondition(index: number):void{
    if(this.conditionArray.length==1) return
    this.conditionArray.splice(index,1)
  }
}
