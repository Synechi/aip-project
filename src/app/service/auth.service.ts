import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserDetails(username, password) {
    //post credentials
    //return this.http.post("/api")
  }
}
