import { MsfPublicLayout } from "src/msf-public/msf-public-layout/msf-public-layout";
import { MsfPublicSidebar } from "src/msf-public/msf-public-sidebar/msf-public-sidebar";

import { ProductHome } from "src/msf-public/public-views/product-home/product-home";
import { FutureTasks } from "src/msf-public/public-views/future-tasks/future-tasks";
import { UserRegister } from "src/msf-public/public-views/user-register/user-register";


/**
 * Import fully=> means start from 'src/msf-public/public-views/...'
 * Otherwise it won't be recognised
 */
export const MsfPublicViewImport = {
    /**
     * declarations- this is reused in msf-module
     */
    declarations: [
        MsfPublicLayout, MsfPublicSidebar, UserRegister,
        
        ProductHome, FutureTasks
    ],

    /**
     * All below ro routing reuse purpose
     */
    ProductHome: ProductHome,
    FutureTasks: FutureTasks,
    UserRegister: UserRegister
}
