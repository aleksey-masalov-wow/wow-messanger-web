import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { FrontendLayoutComponent } from './components/layout/frontend-layout/frontend-layout.component';
import { NavigationLayoutComponent } from './components/layout/navigation-layout/navigation-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    FrontendLayoutComponent,
    NavigationLayoutComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
