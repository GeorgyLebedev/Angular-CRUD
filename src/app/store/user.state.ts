import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private code$ =new Subject<string|null>()
  private login$ = new Subject<string|null>()
  private token$ = new Subject<string|null>()

  public setUserState(code:string|null, login:string|null, token:string|null):void{
    this.code$.next(code)
    this.login$.next(login)
    this.token$.next(token)
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
