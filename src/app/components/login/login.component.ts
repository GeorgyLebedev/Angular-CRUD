import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  login:string=""
  password:string=""
  form:FormGroup=new FormGroup({
    'login': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  @Output() loggedIn=new EventEmitter()

  public enter():void{
    if(this.login=="postgres" && this.password=="admin")
      this.loggedIn.emit()
  }

  public submit():void{
    console.log(this.form.value);
  }
}
