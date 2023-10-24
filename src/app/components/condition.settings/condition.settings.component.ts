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
  isDataFiltered:boolean=false
  params:iCondition={
    column: '',
    condition:'',
    inverse:false,
    value:'',
    valueArray:[]
  }
  async getDataWithCondition(params:iCondition):Promise<void>{
    await this.HttpService.getAllWithCondition(params)
    this.isDataFiltered=true
  }
  isConditionCorrect():boolean{
    if(this.params.condition=='isEmpty' && this.params.column.length)
      return true
    return !!(this.params.column.length && this.params.condition.length && ((this.params.valueArray[0] && this.params.valueArray[1]) || this.params.value.length));
  }
  async resetFilter(): Promise<void>{
    this.resetParams()
    if(this.isDataFiltered)
      await this.HttpService.getAll()
    this.isDataFiltered=false
  }
  resetParams():void{
    this.params={
      column: '',
      condition:'',
      inverse:false,
      value:'',
      valueArray:[]
    }
  }
  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.columns=Object.keys(value[0])
    })
    this.MainState.getCurrentEntity().subscribe(()=>{
      this.resetParams()
    })
  }
}
