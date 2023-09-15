import {Component, OnInit} from '@angular/core';
import {HttpService} from "./services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'text';
  isLoggedIn:boolean=true
  ngOnInit(): void {
    console.log('init')
  }

}
