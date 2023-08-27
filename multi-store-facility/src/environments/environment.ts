
const apiBase = "http://localhost:9091/v1/msf/";
const apiPublic = "http://localhost:9091/v1/msf/public/";

export const environment = {

  production: false,

  authenticate: apiBase + "auth/user",
  authorize: apiBase + "auth/authorize",
  validate: apiBase + "auth/user/validate",
  permission: apiBase + "auth/user/permission",
  logout: apiBase + "auth/logout",


  //Public Urls
  register: apiPublic + "user/add",
}