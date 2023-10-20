import { Component } from '@angular/core';
@Component({
  selector: 'select-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.sass']
})
export class ConditionComponent {

  showSettings:boolean=false

/*  public updateCondition(params:iCondition){
    if(params.condition=='between' && params.value)
      params.value=''
    else if(params.valueArray)
      params.valueArray=[]
    this.params=params
  }*/


}
