
class ApiUrls {

    private static devUrl = 'http://192.168.225.109:9091/v1/msf/';
    private static prodUrl = 'http://192.168.225.109:9091/v1/msf/';
    //private static prodUrl = 'https://msf.com/v1/';
    private static BaseUrl = __DEV__ ? ApiUrls.devUrl : ApiUrls.prodUrl;

    //Regular URI definitions
    //public static ListObjects = { type: 'Get', url: ApiUrls.BaseUrl + 'objects/list/all'}
    
    public static AddObjects = ApiUrls.BaseUrl + 'objects/add';
    public static ListObjects = ApiUrls.BaseUrl + 'objects/list/all';
    public static DeleteObjects = ApiUrls.BaseUrl + 'objects/delete';
}
export default ApiUrls;
