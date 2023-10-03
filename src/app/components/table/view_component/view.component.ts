import {Component, OnInit} from "@angular/core";
import {HttpService} from "../../../services/http.service";
import {MainState} from "../../../store/main_state";
@Component({
  selector: "table-view",
  templateUrl: "./view.component.html",
  styleUrls: ['./view.component.sass'],
})
export class ViewComponent implements OnInit{
  constructor(private HttpService: HttpService, private MainState: MainState) {
  }
  tableData: Array<any>
  columns: string[]
  addRow: boolean=false
  deleteRow:boolean=false
  deleteRowId:number=-1
  editRow: boolean=false
  editRowData:any={}
  checkTableEmpty(): boolean {
    return (this.tableData.length == 1 && Object.values(this.tableData[0]).every(element => element === ''))
  }
  isImg(value:any){
    if(typeof value=='string' && value.startsWith('data:image/'))
      return value
    else return false
  }
  getValues(row:any):Array<any>{
    return Object.values(row)
  }
  setDeleteOptions(id:number){
    this.deleteRowId=id
    this.deleteRow=true
  }
  setEditOptions(row:any){
    this.editRowData=row
    this.editRow=true
  }

  cancelAdding(){
    this.addRow=false
  }
  cancelDelete(){
    this.deleteRowId=-1
    this.deleteRow=false
  }

  cancelEdit(){
    this.editRow=false
    this.editRowData= {}
  }
  ngOnInit() {
    this.MainState.getTableData().subscribe((value) => {
      if (!value) return
      this.tableData = value
      this.columns = Object.keys(this.tableData[0])
      this.addRow=this.editRow=this.deleteRow=false
    })
  }
}
