import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registerForm: FormGroup;
  message: string;
  returnUrl: string;
  userInfo$;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userid: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.returnUrl = "/home";
    this.authService.logout();
  }

  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    if (this.registerForm.invalid) {
      return;
    } else {
      this.userInfo$ = {
        username: this.f.userid.value,
        email: this.f.email.value,
        password: this.f.password.value
      };
      this.authService.postUserRegistration(this.userInfo$).subscribe(data => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", this.f.userid.value);
          this.router.navigate([this.returnUrl]);
          return console.log("Login successful");
        } else {
          this.message = "Unable to create account";
        }
      });
    }
  }
}
