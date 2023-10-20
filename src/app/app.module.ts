import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import {TablesBarComponent} from "./components/tables_bar/tables_bar.component";
import {ConditionSettings} from "./components/condition.settings/condition.settings.component";
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { ErrorComponent } from './components/error/error.component';
import { InputComponent } from './components/table/input/input.component';
import {ViewComponent} from "./components/table/view_component/view.component";
import {CreateRowComponent} from "./components/table/create_row_component/create.row.component";
import {DeleteRowComponent} from "./components/table/delete_row_component/delete.row.component";
import {EditRowComponent} from "./components/table/update_row_component/edit.row.component";
import {UserCardComponent} from "./components/user_card/user.card.component";
import { ConditionComponent } from './components/condition/condition.component';

@NgModule({
  declarations: [
    AppComponent,
    TablesBarComponent,
    ConditionSettings,
    LoginComponent,
    ErrorComponent,
    InputComponent,
    ViewComponent,
    CreateRowComponent,
    DeleteRowComponent,
    EditRowComponent,
    UserCardComponent,
    ConditionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
