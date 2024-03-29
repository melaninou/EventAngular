import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddGroupComponent } from './add-group/add-group.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { MembersComponent } from './page-group-details/members/members.component';
import { GroupPostsComponent } from './page-group-details/group-posts/group-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { YourGroupsComponent } from './your-groups/your-groups.component';
import { YourPostsComponent } from './your-posts/your-posts.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ProfileComponent } from './profile/profile.component';
import { TopNavbarContentComponent } from './top-navbar-content/top-navbar-content.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { FriendProfileComponent } from './friend-profile/friend-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AddGroupComponent,
    CreatePostComponent,
    ViewPostsComponent,
    ViewGroupsComponent,
    GroupDetailsComponent,
    MembersComponent,
    GroupPostsComponent,
    GroupDetailsComponent,
    DashBoardComponent,
    YourGroupsComponent,
    YourPostsComponent,
    PostDetailsComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    ForbiddenComponent,
    ProfileComponent,
    TopNavbarContentComponent,
    FindFriendsComponent,
    FriendProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'add-group', component: AddGroupComponent, canActivate: [AuthGuard] },
      { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
      { path: 'view-posts', component: ViewPostsComponent, canActivate: [AuthGuard] },
      { path: 'view-groups', component: ViewGroupsComponent, canActivate: [AuthGuard], data: { permittedRoles: ['Administrator'] } },
      { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
      { path: 'group-details/:id', component: GroupDetailsComponent, canActivate: [AuthGuard] },
      { path: 'dash-board', component: DashBoardComponent, canActivate: [AuthGuard] },
      { path: 'post-details/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'find-friends', component: FindFriendsComponent },
      { path: 'profile/:userName', component: FriendProfileComponent }
    ]),
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],

})
export class AppModule {
}
