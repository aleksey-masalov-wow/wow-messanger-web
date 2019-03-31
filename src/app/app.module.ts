import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core'
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { AuthGuard } from "./guards/auth.guard";
import { GuestGuard } from "./guards/guest.guard";
import { ApiService } from "./services/api.service";
import { AuthService } from "./services/auth.service";
import { StorageService } from "./services/storage.service";
import { AutoLogoutService } from "./services/auto-logout.service";
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { FrontendLayoutComponent } from './components/layout/frontend-layout/frontend-layout.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthLogoutComponent } from './components/auth-logout/auth-logout.component';
import { NavigationLayoutComponent } from './components/layout/navigation-layout/navigation-layout.component';
import { ConversationsComponent } from './components/conversations/conversations.component';
import { JwtHelper, provideAuth} from "angular2-jwt";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtService } from "./services/jwt.service";
import { PusherService } from "./services/pusher.service";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    FrontendLayoutComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
    NavigationLayoutComponent,
    ConversationsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    GuestGuard,
    ApiService,
    AuthService,
    StorageService,
    AutoLogoutService,
    JwtService,
    JwtHelper,
    PusherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
