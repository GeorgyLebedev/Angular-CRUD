import {Component} from "@angular/core";

@Component({
  selector:"tables-bar",
  templateUrl:"./tables_bar.component.html",
  styleUrls:["./tables_bar.component.sass"]
})

export class TablesBarComponent{
  tablesList:string[]=['Товары', 'Производители', 'Филиалы', 'Клиенты', 'Заказы', 'Поставщики', 'Поставки', 'Заявки']
}
