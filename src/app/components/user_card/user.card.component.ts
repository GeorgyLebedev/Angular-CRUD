import {Component, OnInit} from "@angular/core";
import {UserState} from "../../store/user.state";

@Component({
  selector: "user-card",
  templateUrl: "./user.card.component.html",
  styleUrls: ["./user.card.component.sass"]
})
export class UserCardComponent implements OnInit{
  constructor(private UserState: UserState) {
  }
  userName:string|null=""
  ngOnInit() {

    this.UserState.getUserLogin().subscribe((value) => {

      this.userName=value
    } )
  }
}
