
const apiBase = "http://localhost:9091/v1/msf/";
const apiPublic = "http://localhost:9091/v1/msf/public/";

export const environment = {

    production: false,

    authenticate: apiBase + "auth/user/login",
    authorize: apiBase + "auth/authorize",
    validate: apiBase + "auth/user/validate",
    permission: apiBase + "auth/user/permission",
    logout: apiBase + "auth/logout",
    qrGenerate: apiBase + "QR/generate",
    qrUpdate: apiBase + "QR/update",
    qrVerify: apiBase + "QR/verify/",
    qrSearchName: apiBase + "QR/search/",
    qrSearchAll: apiBase + "QR/search/all",



    //Public Urls
    register: apiPublic + "user/add",
    userDetail: apiPublic + "user/list",
    category: apiBase + "products/category",
    categorySearch: apiBase + "products/category/search/",
    categorySearchAll: apiBase + "products/category/search/all",

    productSearchName: apiPublic + "products/search/",
    productSearchAll: apiPublic + "products/search/all",
    productImage: apiPublic + "products/image/download",
}