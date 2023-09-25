
const apiBase = "http://localhost:9091/v1/msf/";
const apiPublic = "http://localhost:9091/v1/msf/public/";

export const environment = {

    production: false,

    authenticate: apiBase + "auth/user",
    authorize: apiBase + "auth/authorize",
    validate: apiBase + "auth/user/validate",
    permission: apiBase + "auth/user/permission",
    logout: apiBase + "auth/logout",
    qrGenerate: apiBase + "QR/generate",
    qrUpdate: apiBase + "QR/update",
    qrVerify: apiBase + "QR/verify/",
    qrSearchByName: apiBase + "QR/search/",
    qrSearchByType: apiBase + "QR/search/type/",
    allQrCode: apiBase + "QR/search/all",
    productImage: apiBase + "QR/image/download",
    category: apiBase + "products/category",
    categorySearch: apiBase + "products/category/search/",
    categorySearchAll: apiBase + "products/category/search/all",



    //Public Urls
    register: apiPublic + "user/add",
    userDetail: apiPublic + "user/list",
}