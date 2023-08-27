import { MsfPublicLayout } from "src/msf-public/msf-public-layout/msf-public-layout";
import { MsfPublicSidebar } from "src/msf-public/msf-public-sidebar/msf-public-sidebar";

import { GeneralInfo } from "src/msf-public/public-views/general-info/general-info";
import { FutureTasks } from "src/msf-public/public-views/future-tasks/future-tasks";


/**
 * Import fully=> means start from 'src/msf-public/public-views/...'
 * Otherwise it won't be recognised
 */
export const MsfPublicViewImport = {
    /**
     * declarations- this is reused in msf-module
     */
    declarations: [
        MsfPublicLayout, MsfPublicSidebar,
        
        GeneralInfo, FutureTasks
    ],

    /**
     * All below ro routing reuse purpose
     */
    GeneralInfo: GeneralInfo,
    FutureTasks: FutureTasks
}
