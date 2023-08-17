import {Component, EventEmitter, Input, Output} from "@angular/core";
import {iCondition} from "../../interfaces/iCondition";
@Component({
  selector: 'select-option',
  templateUrl:'./select_option.component.html',
  styleUrls:['./select_option.component.sass']
})

export class SelectOption{
  @Input() condition!:iCondition
  @Output() deleteCondition=new EventEmitter()
  public dropCondition(){
    this.deleteCondition.emit()
  }
}
