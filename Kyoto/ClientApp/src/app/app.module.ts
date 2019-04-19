import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
      { path: 'add-group', component: AddGroupComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: 'view-posts', component: ViewPostsComponent },
      { path: 'view-groups', component: ViewGroupsComponent },
      { path: 'members', component: MembersComponent },
      { path: 'group-details/:id', component: GroupDetailsComponent },
      { path: 'group-details/:id', component: GroupDetailsComponent },
      { path: 'dash-board', component: DashBoardComponent },
      { path: 'post-details/:id', component: PostDetailsComponent }
    ]),
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent],

})
export class AppModule {
}
//platformBrowserDynamic().bootstrapModule(AppModule);//sama asi on main.ts-is
