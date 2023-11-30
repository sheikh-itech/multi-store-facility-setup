
class ApiUrls {

    //private static devUrl = 'http://10.120.10.116:9091/v1/msf/';
    private static devUrl = 'http://192.168.225.109:9091/v1/msf/';
    private static prodUrl = 'http://192.168.225.109:9091/v1/msf/';
    //private static prodUrl = 'https://msf.com/v1/';
    public static BaseUrl = __DEV__ ? ApiUrls.devUrl : ApiUrls.prodUrl;

    //Regular URI definitions
    //public static ListObjects = { type: 'Get', url: ApiUrls.BaseUrl + 'objects/list/all'}
    
    //Auth related url
    public static Authenticate = ApiUrls.BaseUrl + 'auth/user';
    public static Authorize = ApiUrls.BaseUrl + 'auth/authorize';
    public static Validate = ApiUrls.BaseUrl + 'auth/user/validate';
    public static Permission = ApiUrls.BaseUrl + 'auth/user/permission';
    public static Logout = ApiUrls.BaseUrl + 'auth/logout';

    //Other related url
    public static AddObjects = ApiUrls.BaseUrl + 'objects/add';
    public static ListObjects = ApiUrls.BaseUrl + 'objects/list/all';
    public static DeleteObjects = ApiUrls.BaseUrl + 'objects/delete';

    public static ProductByName = ApiUrls.BaseUrl + "public/products/search/";
    public static AllProducts = ApiUrls.BaseUrl + "public/products/search/all";
    public static productImage = ApiUrls.BaseUrl + "public/products/image/download";
}
export default ApiUrls;
