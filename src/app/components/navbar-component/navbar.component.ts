import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  username: string;

  ngOnInit() {
    this.username = localStorage.getItem("token");
  }

  logout() {
    console.log(this.username + " has logged out");
    this.authService.logout();
    window.location.reload();
  }
}
