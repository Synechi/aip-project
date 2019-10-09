import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app-component/app.component";
import { NavbarComponent } from "./components/navbar-component/navbar.component";
import { LoginComponent } from "./components/login-component/login.component";
import { PostComponent, CreateResponse } from "./components/post-component/post.component";
import { SignupComponent } from "./components/signup-component/signup.component";
import { CreatePostComponent } from './components/create-post-component/create-post.component';

import { AuthService } from "./service/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { ImageService } from "./service/image.service";
import { ViewOwnPostsComponent } from './components/view-own-posts-component/view-own-posts.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PostComponent,
    SignupComponent,
    CreatePostComponent,
    CreateResponse,
    ViewOwnPostsComponent,
    LeaderBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule,
    NgxPaginationModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [
    CreateResponse
  ],
  providers: [AuthGuard, AuthService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
