import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private authService: AuthService, 
    private breakpointObserver: BreakpointObserver
  ) {}

  username: string;

  ngOnInit() {
    this.username = localStorage.getItem("token");
  }

  logout() {
    console.log(this.username + " has logged out");
    this.authService.logout();
    window.location.reload();
  }

  // Code automatically created by the material angular framework
  // This detects whether the window size matches a mobile device
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
}
