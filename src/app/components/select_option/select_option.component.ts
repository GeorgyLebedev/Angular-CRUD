import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {iCondition} from "../../interfaces/iCondition";
@Component({
  selector: 'select-option',
  templateUrl:'./select_option.component.html',
  styleUrls:['./select_option.component.sass']
})

export class SelectOption{
  @Input() columns: Array<string>
  @Input() isFirst:boolean
  @Input() conditionArrayLength:number
  @Input() params:iCondition
  @Output() deleteCondition=new EventEmitter()
  @Output() updateCondition=new EventEmitter()
  public dropCondition(){
    this.deleteCondition.emit()
  }
}
