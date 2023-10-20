import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {firstValueFrom} from "rxjs";
import {MainState} from "../store/main.state";
import {iCondition} from "../interfaces/iCondition";
import {IUserData} from "../interfaces/iUserData";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  BASE_URL: string
  entity: string

  constructor(private http: HttpClient, private MainState: MainState) {
    this.BASE_URL = "http://localhost:3000/"
    this.MainState.getCurrentEntity().subscribe(async value => {
      this.entity = value
      await this.getAll()
    })
  }

  async authenticate(userData:{login:string, password:string}){
    let res:IUserData={code:"", login:"", token:""}
    try {
      res=await firstValueFrom(this.http.post(this.BASE_URL+'auth/login', userData)) as IUserData
    }
    catch (e:any){
      this.MainState.setError(e)
    }
    return res
  }
  async getAll(entity?:any) {
    let data
    try {
      if(entity){
        data = await firstValueFrom(this.http.get(this.BASE_URL + entity))
        return data
      }
       data = await firstValueFrom(this.http.get(this.BASE_URL + this.entity))
      this.MainState.setTableData(data)
      console.log(data)
    } catch (e: any) {
      this.MainState.setError(e)
    }
    return
  }

  async getAllWithCondition(params:any){
    let link=this.BASE_URL+this.entity+'?'
    let data
    try{
      console.log(params)
      for (let param in params) {
        link +=`${param}=${params[param]}&`
      }
      console.log(link)
      data = await firstValueFrom(this.http.get(link))
      console.log(data)
      this.MainState.setTableData(data)

    }
    catch (e:any){
      this.MainState.setError(e)
    }
  }
  async addNew(dataObject: any) {
    try {
      let result = await firstValueFrom(this.http.post(this.BASE_URL + this.entity, dataObject))
      await this.getAll()
      return result
    } catch (e: any) {
      this.MainState.setError(e)
      return false
    }
  }

  async editRow(id: number, dataObject: any) {
    try {
      let result = await firstValueFrom(this.http.patch(this.BASE_URL + this.entity + `/${id}`, dataObject))
      await this.getAll()
      return result
    } catch (e: any) {
      this.MainState.setError(e)
      return false
    }
  }

  async delete(id: number) {
    try {
      let result = await firstValueFrom(this.http.delete(this.BASE_URL + this.entity + `/${id}`))
      await this.getAll()
      return result
    } catch (e: any) {
      this.MainState.setError(e)
      return false
    }
  }
}
