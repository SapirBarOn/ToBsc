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
import { CollegesComponent } from './app-main/colleges/colleges.component';
import { InstitutesComponent } from './app-main/institutes/institutes.component';
import { SubEngComponent } from './app-main/sub-eng/sub-eng.component';
import { FacebookComponent } from './app-main/facebook/facebook.component';

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
  {path: 'institutes', component: InstitutesComponent},
  {path: 'subEng', component: SubEngComponent},
  {path: 'facebook', component: FacebookComponent}

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
    InstitutesComponent,
    SubEngComponent,
    FacebookComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
