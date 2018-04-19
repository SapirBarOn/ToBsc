import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
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
import { SubEngComponent } from './app-main/sub-eng/sub-eng.component';
import {CurrentUser} from './app-shared/current-user';
import { CollegesComponent } from './app-main/colleges/colleges.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/aboutUs', pathMatch: 'full'},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'enter', component: EnterComponent},
  {path: 'chat-bot', component: ChatBotComponent},
  {path: 'expert', component: ExpertComponent},
  {path: 'colleges', component: CollegesComponent},
  {path: 'SubEng', component: SubEngComponent}

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
    SubEngComponent,
    CollegesComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [RouterModule],
  providers: [DataService,CurrentUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
