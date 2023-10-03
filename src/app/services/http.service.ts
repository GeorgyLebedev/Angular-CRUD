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
    this.MainState.getCurrentEntity().subscribe(async value => {
      this.entity = value
      await this.getAll()
    })
  }

  async getAll() {
    try {
      let data = await firstValueFrom(this.http.get(this.BASE_URL + this.entity))
      this.MainState.setTableData(data)
      console.log(data)
    } catch (e: any) {
      this.MainState.setError(e)
    }
  }

  async getTableData(entity: string) {
    let data
    try {
      data = await firstValueFrom(this.http.get(this.BASE_URL + entity))
    } catch (e: any) {
      this.MainState.setError(e)
    }
    return data
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
