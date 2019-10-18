import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  uri = "https://aip-restapi.herokuapp.com/users";

  constructor(private http: HttpClient) { }

  //User Logout
  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }

  //Login credential check
  postUserLogin(login) {
    return this.http.post(`${this.uri}/login`, login);
  }

  //Signup post
  postUserRegistration(user) {
    return this.http.post(`${this.uri}/signup`, user);
  }

  //Get all active users
  getAllUsers() {
    return this.http.get(`${this.uri}/get-all-users`);
  }
}
