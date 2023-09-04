import { MsfAnimateLayout } from "src/msf-app/msf-animate-layout/msf-animate-layout";
import { MsfLayout } from "src/msf-app/msf-layout/msf-layout";

import { MsfSidebar } from "src/app/common-views/msf-sidebar/msf-sidebar";
import { MsfAnimateSidebar } from "src/app/common-views/msf-animate-sidebar/msf-animate-sidebar";
import { MsfSidebarOld } from "src/app/common-views/msf-sidebar-old/msf-sidebar-old";

import { MsfHeader } from "src/app/common-views/msf-header/msf-header";
import { MsfFooter } from "src/app/common-views/msf-footer/msf-footer";

import { HomeComponent } from "src/app/common-views/home/home.component";
import { ResetPassword } from "src/msf-app/user/reset-password/reset-password";
import { UserDetail } from "src/msf-app/user/user-detail/user-detail";
import { UserNotification } from "src/msf-app/user/user-notification/user-notification";
import { UserUpdate } from "src/msf-app/user/user-update/user-update";
import { AngularDefaultPage } from "src/r&d/default-page/angular-default-page";
import { AccessDenied } from "src/app/common-views/access-denied/access-denied";
import { QrCodeGenerate } from "src/msf-app/business/qr-code/qr-code-generate/qr-code-generate";
import { ProductCategory } from "src/msf-app/product/product-category/product-category";
import { QrCodeUpdate } from "src/msf-app/business/qr-code/qr-code-update/qr-code-update";


/**
 * Import fully=> means start from 'src/msf-app...'
 * Otherwise it won't be recognised
 */
export const MsfViewImport = {
    /**
     * declarations- this is reused in msf-module
     */
    declarations: [
        MsfLayout, MsfAnimateLayout, MsfHeader, MsfFooter, MsfSidebarOld, MsfSidebar, MsfAnimateSidebar,
        HomeComponent, UserDetail, UserUpdate, ResetPassword, UserNotification, 
        QrCodeGenerate, QrCodeUpdate,ProductCategory,

        AccessDenied,
        AngularDefaultPage
    ],

    /**
     * All below ro routing reuse purpose
     */
    
    QrCodeGenerate: QrCodeGenerate,
    QrCodeUpdate: QrCodeUpdate,
    ProductCategory: ProductCategory,
    AngularDefaultPage: AngularDefaultPage,
    HomeComponent: HomeComponent,
    UserDetail: UserDetail,
    UserUpdate: UserUpdate,
    ResetPassword: ResetPassword,
    UserNotification: UserNotification,
    AccessDenied: AccessDenied
}
