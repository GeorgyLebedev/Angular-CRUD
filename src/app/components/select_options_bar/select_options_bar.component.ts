import {Component, OnInit} from "@angular/core";
import {iCondition} from "../../interfaces/iCondition";
import {MainState} from "../../store/main.state";
import {HttpService} from "../../services/http.service";

@Component({
  selector: "select-options-bar",
  templateUrl:"./select_options_bar.component.html",
  styleUrls:["./select_options_bar.component.sass"]
})

export class SelectOptionsBar implements OnInit{
  constructor(private HttpService:HttpService, private MainState:MainState) {
  }
  columns:Array<string>
  conditionArray: iCondition[]=[]

  public addNewCondition():void{
    if(this.conditionArray.length>=5) return
    const condition={
      column: '',
      condition:'',
      inverse:false,
      value:'',
      valueArray:[]
    }
    this.conditionArray.push(condition)
  }

  public deleteCondition(index: number):void{
    if(this.conditionArray.length==0) return
    this.conditionArray.splice(index,1)
  }
  public updateCondition(params:iCondition, index:number){
    if(params.condition=='between' && params.value)
      params.value=''
    else if(params.valueArray)
      params.valueArray=[]
    this.conditionArray[index]=params
  }
  async getDataWithCondition(params:iCondition){
   await this.HttpService.getAllWithCondition(params)
  }
  isConditionCorrect(){
    let isCorrect=false
    this.conditionArray.forEach(el=>{
      if(el.column.length && el.condition.length && ((el.valueArray[0] && el.valueArray[1])||el.value.length)) {
        isCorrect = true
      }
    })
    return isCorrect
  }
  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.columns=Object.keys(value[0])
    })
  }
}
