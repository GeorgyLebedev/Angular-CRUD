import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class MainState {
  private currentEntity$ = new Subject<string>()
  private tableData$ = new Subject<any>()
  private error$=new BehaviorSubject<Error|undefined>(undefined)
  setTableData(value: any): void {
    this.tableData$.next(value);
  }
  getTableData(): Observable<any> {
    return this.tableData$.asObservable();
  }

  setError(e:Error|undefined):void{
    this.error$.next(e)
  }

  getError():Observable<Error|undefined>{
    return this.error$.asObservable()
  }
  setCurrentEntity(entity:string):void{
    this.currentEntity$.next(entity)
  }
  getCurrentEntity():Observable<string>{
    return this.currentEntity$.asObservable()
  }

}
