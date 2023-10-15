import {Component, OnInit} from '@angular/core';
import {MainState} from "../../store/main.state";
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
      if(!value) {
        this.message = undefined
        return
      }
      if((value as HttpErrorResponse).error){
        this.message=(value as HttpErrorResponse).error.text?(value as HttpErrorResponse).error.text:(value as HttpErrorResponse).error.message[0]
      }
      else if(value.message){
        this.message=value
      }
      if(this.message) setTimeout(_=> this.clear(), 10000)
    })
  }
}
