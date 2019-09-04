import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getUserDetails(username, password) {
    //post credentials
    //return this.http.post("/api")
  }

  getLogin() {
    return this.http.get(`${this.uri}/logins`);
  }

  getLoginByUsername(username) {
    return this.http.get(`${this.uri}/logins/${username}`)
  }

  addLogin(username, password) {
    const login = {
      username: username,
      password: password
    };
    return this.http.post(`${this.uri}/logins/add`, login);
  }
}
