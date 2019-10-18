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
  ) { }

  registerForm: FormGroup;
  message: string;
  returnUrl: string;
  userInfo$;

  ngOnInit() {
    //Create form object
    this.registerForm = this.formBuilder.group({
      userid: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern('((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]]
    });
    this.returnUrl = "/home";
    //Logs out any user if they made it through the guard.
    this.authService.logout();
  }

  get f() {
    return this.registerForm.controls;
  }

  registerUser() {
    //Checks to see if the form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      //Stores form values into an object
      this.userInfo$ = {
        username: this.f.userid.value,
        email: this.f.email.value,
        password: this.f.password.value
      };
      //Posts form data to RESTful api
      this.authService.postUserRegistration(this.userInfo$).subscribe(obs => {
        let stringData = JSON.stringify(obs);
        let data = JSON.parse(stringData);
        console.log(obs);
        // Checks to see if there was any issues with the account creation with a special flag for username duplication
        if (data.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", this.f.userid.value);
          window.location.reload();
          this.router.navigate(['/home']);
          return console.log("Login successful");
        } else if (data.message === "Username Already Exits") {
          this.message = "Username already in use!";
        } else {
          this.message = "Unable to create account";
        }
      });
    }
  }
}
