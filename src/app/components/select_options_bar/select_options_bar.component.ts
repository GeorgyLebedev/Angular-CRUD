import {Component, OnInit} from "@angular/core";
import {iCondition} from "../../interfaces/iCondition";
import {MainState} from "../../store/main_state";

@Component({
  selector: "select-options-bar",
  templateUrl:"./select_options_bar.component.html",
  styleUrls:["./select_options_bar.component.sass"]
})

export class SelectOptionsBar implements OnInit{
  constructor(private MainState:MainState) {
  }
  columns:Array<string>
  conditionArray: iCondition[]=[{
    column: 'Столбец 1',
    condition: "=",
    value:"",
    inverse: false
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

  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.columns=Object.keys(value[0])
    })
  }
}
