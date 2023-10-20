import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserState} from "../../store/user.state";
import {HttpService} from "../../services/http.service";
import {IUserData} from "../../interfaces/iUserData";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  constructor(private HttpService:HttpService,private UserState:UserState) {
  }
  login:string=""
  password:string=""
  form:FormGroup=new FormGroup({
    'login': new FormControl('', [Validators.required, Validators.minLength(6)]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  async submit(event:SubmitEvent){
    event.preventDefault()
    const result:IUserData = await this.HttpService.authenticate(this.form.value)
    if(result.code&&result.login&&result.token){
      this.UserState.setUserState(result)
    }
  }
}
