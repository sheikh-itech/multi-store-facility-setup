import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MsfLogin } from './common-views/msf-login/msf-login';
import { RouteGuard } from 'src/common/services/route-guard';

import { MsfLayout } from 'src/msf-app/msf-layout/msf-layout';
import { MsfPublicLayout } from 'src/msf-public/msf-public-layout/msf-public-layout';
import { MsfAnimateLayout } from 'src/msf-app/msf-animate-layout/msf-animate-layout';
import { MsfViewImport } from '../msf-app/msf-view-import';
import { MsfPublicViewImport } from '../msf-public/msf-public-import';

const animateLayout = false;

const routes: Routes = [

    { path: 'login', component:  MsfLogin},
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    {
        path: '',
        component: animateLayout ? MsfAnimateLayout : MsfLayout,
        children: [
            { path: 'accessDenied', component:  MsfViewImport.AccessDenied},
            { path: 'test', component:  MsfViewImport.AngularDefaultPage, canActivate:[RouteGuard]},
            { path: 'home', component:  MsfViewImport.HomeComponent, canActivate:[RouteGuard]},
            { path: 'userDetail', component:  MsfViewImport.UserDetail, canActivate:[RouteGuard]},
            { path: 'userUpdate', component:  MsfViewImport.UserUpdate, canActivate:[RouteGuard]},
            { path: 'userNotification', component:  MsfViewImport.UserNotification, canActivate:[RouteGuard]},
            { path: 'resetPassword', component:  MsfViewImport.ResetPassword, canActivate:[RouteGuard]},
            { path: 'qrGenerate', component:  MsfViewImport.QrCodeGenerate, canActivate:[RouteGuard]},
            { path: 'qrSearchUpdate', component:  MsfViewImport.QrCodeUpdate},
            { path: 'category', component:  MsfViewImport.ProductCategory},
        ]
    },

    {
        path: 'msf',
        component: MsfPublicLayout,
        children: [
            { path: '', component:  MsfPublicViewImport.GeneralInfo},
            { path: 'futureTasks', component:  MsfPublicViewImport.FutureTasks},
            { path: 'register', component:  MsfPublicViewImport.UserRegister}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
