import {Component, OnInit} from '@angular/core';
import {UserState} from "./store/user.state";
import {MainState} from "./store/main.state";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  constructor(private UserState:UserState, private MainState:MainState) {
  }
  isLoggedIn:boolean=false
  selectedTable:string=""
  ngOnInit() {
    this.UserState.getUserToken().subscribe((value)=>{
      this.isLoggedIn=true
    })
    this.MainState.getCurrentEntity().subscribe(value=>this.selectedTable=value)
  }
}
