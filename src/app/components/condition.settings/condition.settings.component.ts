import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {iCondition} from "../../interfaces/iCondition";
import {HttpService} from "../../services/http.service";
import {MainState} from "../../store/main.state";
@Component({
  selector: 'condition-settings',
  templateUrl:'./condition.settings.component.html',
  styleUrls:['./condition.settings.sass']
})

export class ConditionSettings implements OnInit{
  constructor(private HttpService:HttpService, private MainState:MainState) {
  }
  columns: Array<string|undefined>
  params:iCondition={
    column: '',
    condition:'',
    inverse:false,
    value:'',
    valueArray:[]
  }
  async getDataWithCondition(params:iCondition){
    await this.HttpService.getAllWithCondition(params)
  }
  isConditionCorrect(){
    let isCorrect=false
    if(this.params.column.length && this.params.condition.length && ((this.params.valueArray[0] && this.params.valueArray[1])||this.params.value.length)) {
      isCorrect = true
    }
    return isCorrect
  }
  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.columns=Object.keys(value[0])
    })
    this.MainState.getCurrentEntity().subscribe(()=>{
      this.params={
        column: '',
        condition:'',
        inverse:false,
        value:'',
        valueArray:[]
      }
    })
  }
}
