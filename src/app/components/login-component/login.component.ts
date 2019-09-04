import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private Auth: AuthService) {}

  ngOnInit() {}

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const uname = target.username.value;
    const pword = target.password.value;
    //this.Auth.getUserDetails(uname, pword);
    //this.Auth.getLoginByUsername(uname).subscribe(())

  }
}
