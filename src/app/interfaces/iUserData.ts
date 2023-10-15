import {Observable, Subject} from "rxjs";

export interface IUserData{
  code:Subject<string|null>,
  login:Subject<string|null>,
  token:Subject<string|null>
}
