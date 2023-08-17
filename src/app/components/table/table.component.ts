import {Component} from "@angular/core";

@Component({
  selector: "table-content",
  templateUrl: "./table.component.html",
  styleUrls:['./table.component.sass']
})

export class TableComponent{
  rows:number[]=Array(4)
  cols:number[]=Array(8)
  newRow:boolean=false
  public addRow(){
    this.rows.push(1)
    this.newRow=false
  }
}
