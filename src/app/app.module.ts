import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TablesBarComponent} from "./components/tables_bar/tables_bar.component";
import {TableComponent} from "./components/table/table.component";
import {SelectOptionsBar} from "./components/select_options_bar/select_options_bar.component";
import {SelectOption} from "./components/select_option/select_option.component";

@NgModule({
  declarations: [
    AppComponent,
    TablesBarComponent,
    TableComponent,
    SelectOptionsBar,
    SelectOption
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
