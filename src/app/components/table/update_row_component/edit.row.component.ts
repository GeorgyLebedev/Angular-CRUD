import {Component, EventEmitter, Input, Output} from "@angular/core";
import {HttpService} from "../../../services/http.service";
@Component({
  selector:'edit-row',
  templateUrl:'./edit.row.component.html',
  styleUrls:['./edit.row.component.sass']
})

export class EditRowComponent{
  @Input()
  rowData:any={}
  @Input()
  columns:string[]

  @Output() onEditCancel = new EventEmitter()
  isSaveAvailable:boolean=false
  newData: any={}
  constructor(private HttpService: HttpService) {
  }
  updateRow(value: any) {
    this.newData = Object.assign(this.rowData, value)
    this.isSaveAvailable=true
  }
  cancel(){
    this.rowData=this.newData={}
    this.onEditCancel.emit()
    this.isSaveAvailable=false
  }
  async saveModifiedRow(){
    console.log(this.newData)
      await this.HttpService.editRow(this.newData.code, this.newData)
    this.cancel()
  }

}
