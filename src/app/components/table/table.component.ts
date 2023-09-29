import {Component, OnInit} from "@angular/core";
import {HttpService} from "../../services/http.service";
import {MainState} from "../../store/main_state";
import {Branch} from "../../../server/src/db/branch/entities/branch.entity";
import {Employee} from "../../../server/src/db/employee/entities/employee.entity";

@Component({
  selector: "table-content",
  templateUrl: "./table.component.html",
  styleUrls: ['./table.component.sass'],
})

export class TableComponent implements OnInit {
  constructor(private HttpService: HttpService, private MainState: MainState) {
  }

  protected readonly Object = Object;
  tableData: Array<Branch | Employee>
  columns: string[]
  deleteOptions: { deleteInProcess: boolean, rowId: number | null } = {
    deleteInProcess: false,
    rowId: null
  }
  editOptions: { editInProcess: boolean, rowId: number | null, modifiedData:any } = {
    editInProcess: false,
    rowId: null,
    modifiedData:{}
  }
  newRowOptions:{addInProcess:boolean,rowData: any}={
    addInProcess:false,
    rowData:{}
  }

  async addRow() {
    if (await this.HttpService.addNew(this.newRowOptions.rowData))
      this.cancelAdding()
  }

  confirmDelete(id: number) {
    this.deleteOptions.deleteInProcess = true
    this.deleteOptions.rowId = id
  }


  async deleteRow() {
    if (this.deleteOptions.rowId)
      await this.HttpService.delete(this.deleteOptions.rowId)
    this.cancelDelete()
  }
  async saveModifiedRow(){
      if(this.editOptions.rowId && this.editOptions.modifiedData)
        await this.HttpService.editRow(this.editOptions.rowId, this.editOptions.modifiedData)
    this.cancelEdit()
  }
  cancelAdding(){
    this.newRowOptions.addInProcess=false
    this.newRowOptions.rowData={}
  }
  cancelDelete() {
    this.deleteOptions = {
      deleteInProcess: false,
      rowId: null
    }
  }
  cancelEdit(){
    this.editOptions={
      editInProcess:false,
      modifiedData:null,
      rowId:null
    }
  }
  editRow(row:any){
    this.editOptions={
      editInProcess:true,
      rowId:row.code,
      modifiedData:row
    }
  }
  checkTableEmpty(): boolean {
    return (this.tableData.length == 1 && Object.values(this.tableData[0]).every(element => element === ''))
  }

  updateNewRow(value: any) {
    this.newRowOptions.rowData = Object.assign(this.newRowOptions.rowData, value)
  }
  updateEditData(value: any) {
    this.editOptions.modifiedData = Object.assign(this.editOptions.modifiedData, value)
  }
  isImg(value:any){
    if(typeof value=='string' && value.startsWith('data:image/'))
      return value
    else return false
  }
  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.tableData = value
      this.columns = Object.keys(this.tableData[0])
    })
  }
}
