import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import {TablesBarComponent} from "./components/tables_bar/tables_bar.component";
import {TableComponent} from "./components/table/table.component";
import {SelectOptionsBar} from "./components/select_options_bar/select_options_bar.component";
import {SelectOption} from "./components/select_option/select_option.component";
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    TablesBarComponent,
    TableComponent,
    SelectOptionsBar,
    SelectOption,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
