import {Component, OnInit} from "@angular/core";
import {HttpService} from "../../services/http.service";
import {MainState} from "../../store/main_state";
import {Branch} from "../../../server/src/db/branch/entities/branch.entity";
import {Employee} from "../../../server/src/db/employee/entities/employee.entity";
@Component({
  selector: "table-content",
  templateUrl: "./table.component.html",
  styleUrls:['./table.component.sass'],
})

export class TableComponent implements OnInit {
  constructor(private HttpService: HttpService, private MainState: MainState) {
  }

  protected readonly Object = Object;
  newRow: boolean = false
  entity: any = {}
  tableData: Array<Branch|Employee>
  columns: string[]
  deleteOptions:{ deleteInProcess: boolean, rowId: number|null} = {
    deleteInProcess: false,
    rowId:null
  }
  editOptions:{ editInProcess:false, rowId:number|null }={
    editInProcess: false,
    rowId:null
  }

  async addRow() {
    if(await this.HttpService.addNew(this.entity))
    this.newRow = false
  }
  confirmDelete(id:number){
    this.deleteOptions.deleteInProcess=true
    this.deleteOptions.rowId=id
  }
  cancelDelete(){
    this.deleteOptions= {
      deleteInProcess: false,
      rowId:null
    }
  }
 async deleteRow() {
   if(this.deleteOptions.rowId)
   await this.HttpService.delete(this.deleteOptions.rowId)
   this.cancelDelete()
  }

  getInputType(column: string): string {
    if (column.includes('phone')) return 'tel'
    else if (column.includes('email')) return 'email'
    else if (column.startsWith('is') && column.charAt(2) === column.charAt(2).toUpperCase()) return 'checkbox'
    else if (column.includes('photo')) return 'file'
    else if (column.includes('price') || column.includes('quantity')) return 'number'
    else return 'text'
  }

  isDisabledColumn(column: string): boolean {
    return column === 'code' || column.toLowerCase().includes('date');
  }

  checkTableEmpty(): boolean {
    return (this.tableData.length == 1 && Object.values(this.tableData[0]).every(element => element === ''))
  }

  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.tableData = value
      this.columns = Object.keys(this.tableData[0])
    })
  }
}
