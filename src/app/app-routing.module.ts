import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app-component/app.component';
import { LoginComponent } from './components/login-component/login.component';
import { PostComponent } from './components/post-component/post.component';
import { SignupComponent } from './components/signup-component/signup.component';
import { CreatePostComponent } from './components/create-post-component/create-post.component';
import { ViewPostComponent } from './components/view-post-component/view-post.component';
import { ViewOwnPostsComponent } from './components/view-own-posts-component/view-own-posts.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createPost', component: CreatePostComponent},
  { path: 'home/viewPost', component: ViewPostComponent},
  { path: 'viewOwnPosts', component: ViewOwnPostsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
