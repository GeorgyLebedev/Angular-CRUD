import {Component, EventEmitter, Input, Output} from "@angular/core";
import {HttpService} from "../../../services/http.service";
@Component({
  selector:'delete-row',
  templateUrl:'./delete.row.component.html',
  styleUrls:['./delete.row.component.sass']
})

export class DeleteRowComponent{
  @Input()
  rowId:number=-1

  @Output() onDeleteCancel = new EventEmitter()
  constructor(private HttpService: HttpService) {
  }

  cancel(){
    this.rowId=-1
    this.onDeleteCancel.emit()
  }
  async deleteRow() {
    if (this.rowId)
      await this.HttpService.delete(this.rowId)
    this.cancel()
  }
}
