import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
} from "angular5-social-login";

import { NgbModule ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AuthComponent } from './app-main/auth/auth.component';
import { LoginComponent } from './app-main/login/login.component';
import { AboutUsComponent } from './app-main/aboutUs/aboutUs.component';
import { EnterComponent } from './app-main/enter/enter.component';
import { ExpertComponent } from './app-main/expert/expert.component';
import { ChatBotComponent } from './app-main/chat-bot/chat-bot.component';
import { SubEngByUserComponent } from './app-main/subEngByUser/subEngByUser.component';
import { CurrentUser } from './app-shared/current-user';
import { CurrentColleges } from './app-shared/current-college';

import { CollegesComponent } from './app-main/colleges/colleges.component';
import { FacebookComponent } from './app-main/facebook/facebook.component';
import { AgmCoreModule } from '@agm/core';
import { DepartmentsComponent } from './app-main/departments/departments.component';
import { ForgotPasswordComponent } from './app-main/forgot-password/forgot-password.component';
import { IntoCollegeComponent } from './app-main/colleges/into-college/into-college.component';


// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("825684884292849")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },
      ]);
  return config;
}

const appRoutes: Routes = [
  {path: '', redirectTo: '/aboutUs', pathMatch: 'full'},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'enter', component: EnterComponent},
  {path: 'chat-bot', component: ChatBotComponent},
  {path: 'expert', component: ExpertComponent},
  {path: 'colleges', component: CollegesComponent},
  {path: 'subEngByUser', component: SubEngByUserComponent},
  {path: 'colleges', component: CollegesComponent},
  {path: 'departments', component: DepartmentsComponent},
  {path: 'facebook', component: FacebookComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'intoCollege', component: IntoCollegeComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppMainComponent,
    AuthComponent,
    LoginComponent,
    AboutUsComponent,
    EnterComponent,
    ExpertComponent,
    ChatBotComponent,
    SubEngByUserComponent,
    CollegesComponent,
    FacebookComponent,
    DepartmentsComponent,
    ForgotPasswordComponent,
    IntoCollegeComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCAl7947O2CZzG-4JFUVntpAOZeNSblfaI'
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    SocialLoginModule,
    NgbModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [
    DataService,
    CurrentUser,
    CurrentColleges,
      {
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
      },
    NgbModule,
    NgbAlertConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
