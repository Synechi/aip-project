import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  uri = "https://aip-restapi.herokuapp.com/users";

  constructor(private http: HttpClient) { }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
  }

  postUserLogin(login) {
    return this.http.post(`${this.uri}/login`, login);
  }

  postUserRegistration(user) {
    return this.http.post(`${this.uri}/signup`, user);
  }

  getLoginByUsername(username) {
    return this.http.get(`${this.uri}/${username}`);
  }

  addLogin(username, password) {
    const login = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/add`, login);
  }
}
