import {Component, OnInit} from '@angular/core';
import {MainState} from "../../store/main_state";
import {HttpErrorResponse} from "@angular/common/http";
import {animate, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass'],
  animations: [
    trigger('show', [
      state(
        'open',
        style({
          transform:'translateY(0px)',
          opacity: 1,
        })
      ),
      state(
        'closed',
        style({
          transform:'translateY(-50px)',
          opacity: 0,
        })
      ),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')]),
    ]),
  ],
})
export class ErrorComponent implements OnInit{
  constructor(private MainState:MainState) {
  }
  message: Error|undefined=undefined
  public clear(){
    this.MainState.setError(undefined)
  }
  ngOnInit(): void {
    this.MainState.getError().subscribe((value)=>{
      this.message = value?(value as HttpErrorResponse).error.text:undefined
      if(this.message) setTimeout(_=> this.clear(), 10000)
    })
  }
}
