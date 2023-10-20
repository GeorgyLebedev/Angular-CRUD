import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Injectable} from "@angular/core";
import {IUserData} from "../interfaces/iUserData";

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private code$ =new BehaviorSubject<string|null>(null)
  private login$ = new BehaviorSubject<string|null>(null)
  private token$ = new BehaviorSubject<string|null>(null)

  public setUserState(userData:IUserData):void{
    this.code$.next(userData.code)
    this.login$.next(userData.login)
    this.token$.next(userData.token)
  }
  public getUserCode():Observable<string|null>{
    return this.code$ as Observable<string|null>
  }
  public getUserLogin():Observable<string|null>{
    return this.login$ as Observable<string|null>
  }
  public getUserToken():Observable<string|null>{
    return this.token$ as Observable<string|null>
  }
}
