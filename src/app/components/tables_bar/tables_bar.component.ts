import {Component, OnInit} from "@angular/core";
import {Entities} from "../../reusables/entities";
import {HttpService} from "../../services/http.service";
import {MainState} from "../../store/main.state";
import {firstValueFrom} from "rxjs";
@Component({
  selector:"tables-bar",
  templateUrl:"./tables_bar.component.html",
  styleUrls:["./tables_bar.component.sass"]
})

export class TablesBarComponent implements OnInit{
  constructor(private HttpService:HttpService,private MainState:MainState) {
  }
  tablesList=Object.keys(Entities)
  activeTable: string|null=null
   async selectTable(tableName:string){
    this.MainState.setCurrentEntity(tableName)
  }

  protected readonly Entities = Entities;

  ngOnInit(): void {
    this.MainState.getCurrentEntity().subscribe((value)=>{
      this.activeTable=value
    })
  }
}
