import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app-component/app.component';
import { LoginComponent } from './components/login-component/login.component';
import { PostComponent } from './components/post-component/post.component';
import { SignupComponent } from './components/signup-component/signup.component';
import { CreatePostComponent } from './components/create-post-component/create-post.component';
import { ViewPostComponent } from './components/view-post-component/view-post.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home/createPost', component: CreatePostComponent},
  { path: 'home/viewPost', component: ViewPostComponent},
  {path: 'home/leaderBoard', component: LeaderBoardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
