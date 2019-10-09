import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Login } from "src/app/interfaces/login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  loginInfo$;
  userInfo: Login;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.returnUrl = "/home";
    this.authService.logout();
  }

  get f() {
    return this.loginForm.controls;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userInfo = {
        username: this.f.userid.value,
        password: this.f.password.value
      };
      this.authService.postUserLogin(this.userInfo).subscribe(obs => {
        let stringData = JSON.stringify(obs);
        let data = JSON.parse(stringData);
        if (data.success) {
          this.correctLogin(this.userInfo.username)
        } else {
          this.message = "Please check your username and password.";
        }
      });
    }
  }

  correctLogin(userID) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", userID);
    window.location.reload();
    this.router.navigate(['/home']);
    console.log("Login successful");
  }
}
