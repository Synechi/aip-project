import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderboardComponentComponent implements OnInit {

  // Code based on angular material documentation exapmle: https://material.angular.io/components/table/overview
  displayedColumns: string[] = ['username', 'numPosts'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  users: any;

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      (res: any) => {

        this.users = Array.of(res);
        this.users = new MatTableDataSource(this.users[0]);

        // Code by user sschmid from stackoverflow: https://stackoverflow.com/a/57165529
        this.sort.sort(({ id: 'numPosts', start: 'desc', disableClear: false }));
        this.users.sort = this.sort;
      },
      (err) => {
        this.openErrorSnackBar("Failed to load users, refresh the page to try again.", "Error");
      }
    );
  }

  // Code source angular material documentation example: https://material.angular.io/components/snack-bar/overview
  openErrorSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
