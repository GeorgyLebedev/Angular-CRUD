import {Component, EventEmitter, Input, Output} from "@angular/core";
import {HttpService} from "../../../services/http.service";
@Component({
  selector:'create-row',
  templateUrl:'./create.row.component.html',
  styleUrls:['./create.row.component.sass']
})

export class CreateRowComponent{
  @Input()
  columns:Array<string>
  @Output() onAddingCancel = new EventEmitter()
  constructor(private HttpService: HttpService) {
  }
  newRowData:any={}
  updateNewRow(value: any) {
    this.newRowData = Object.assign(this.newRowData, value)
  }
  cancel(){
    this.newRowData={}
    this.onAddingCancel.emit()
  }
  async addRow() {
    console.log(this.newRowData)
    await this.HttpService.addNew(this.newRowData)
  }
}
