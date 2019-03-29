import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AuthLayoutComponent } from './components/layout/auth-layout/auth-layout.component';
import { AuthLoginComponent } from "./components/auth-login/auth-login.component";
import { AuthLogoutComponent } from "./components/auth-logout/auth-logout.component";
import { FrontendLayoutComponent } from './components/layout/frontend-layout/frontend-layout.component';
import { ConversationsComponent } from "./components/conversations/conversations.component";

export const AppRoutes: Routes = [
    {
        path: '',
        //canActivate: [GuestGuard],
        component: AuthLayoutComponent,
        children: [
            { path: 'login', component: AuthLoginComponent, pathMatch: 'full' },
            { path: 'logout', component: AuthLogoutComponent, pathMatch: 'full' }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: FrontendLayoutComponent,
        children: [
            { path: 'conversations', component: ConversationsComponent, pathMatch: 'full'}
        ]
    },
    { path: '**', redirectTo: 'conversations' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes);