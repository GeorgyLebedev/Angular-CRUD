import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {firstValueFrom} from "rxjs";
import {MainState} from "../store/main_state";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  BASE_URL: string
  entity: string

  constructor(private http: HttpClient, private MainState: MainState) {
    this.BASE_URL = "http://localhost:3000/"
    this.MainState.getCurrentEntity().subscribe(async value=>{
      this.entity=value
      await this.getAll()
    })
  }

  async getAll() {
    try {
      let data = await firstValueFrom(this.http.get(this.BASE_URL + this.entity))
      this.MainState.setTableData(data)
    } catch (e: any) {
      this.MainState.setError(e)
    }
  }

  async addNew(data: any) {
    try {
      let result = await firstValueFrom(this.http.post(this.BASE_URL + this.entity, data))
      await this.getAll()
      return result
    } catch (e: any) {
      this.MainState.setError(e)
      return false
    }
  }

  async delete(id:number){
    try {
      let result=await firstValueFrom(this.http.delete(this.BASE_URL+this.entity+`/${id}`))
      await this.getAll()
      return result
    }
    catch (e: any) {
      this.MainState.setError(e)
      return false
    }
  }
}
