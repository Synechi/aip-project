import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  //This guard is used to restrict users to only be able to access login and signup pages as long as they are not logged in.

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['/home'])
      return false
    }
    else {
      return true
    }
  }


  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem("isLoggedIn") == "true") {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
