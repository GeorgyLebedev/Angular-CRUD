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

  newData: any={}
  constructor(private HttpService: HttpService) {
  }
  updateRow(value: any) {
    this.newData = Object.assign(this.newData, value)
  }
  cancel(){
    this.rowData=this.newData={}
    this.onEditCancel.emit()
  }
  async saveModifiedRow(){
      await this.HttpService.editRow(this.newData.code, this.newData)
    this.cancel()
  }

}
