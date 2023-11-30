import axios, { AxiosInstance } from 'axios';
import UserService from './UserService';
import ApiUrls from '../../navigation/ApiUrls';

class HttpService {

    private static instance: AxiosInstance;

    private static options = {
        timeout: 10 * 1000 // Set a timeout of 10 seconds
    };

    static async getApi(url: string, options?: any) {

        if (!options)
            options = HttpService.options;

        try {
            //return await axios.get(url, options);
            return (await (await HttpService.getInstance()).get(url, options)).data;
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async postApi(url: string, body: any, options?: any) {

        if (!options)
            options = HttpService.options;

        try {
            //return await axios.post(url, body, options);
            return (await (await HttpService.getInstance()).post(url, body, options)).data;
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async patchApi(url: string, body: any, options?: any) {

        if (!options)
            options = HttpService.options;

        try {
            //return await axios.patch(url, body, options);
            return (await (await HttpService.getInstance()).patch(url, body, options)).data;
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async deleteApi(url: string, options?: any) {

        if (!options)
            options = HttpService.options;

        try {
            //return await axios.delete(url, options);
            return (await (await HttpService.getInstance()).delete(url, options)).data;
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async updateApi(url: string, body: any, options?: any) {

        if (!options)
            options = HttpService.options;

        try {
            return await axios.put(url, body, options);
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    private static handleError(error: any) {
        //Common place to handle error
    }

    public static setNetworkTimeout(time: number): void {

        HttpService.options.timeout = time;
    }

    private static async getInstance() {

        const token = await UserService.getUserToken();

        if (!HttpService.instance) {
            HttpService.instance = axios.create({
                baseURL: ApiUrls.BaseUrl,
                timeout: 10000, // Set a timeout of 10 seconds
            });
            // Add request interceptor
            HttpService.instance.interceptors.request.use(
                (config: any) => {
                    // Add headers and handle token here

                    config.headers = {
                        ...config.headers,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                        'Authorization': token ? `MSF+${token}` : ''
                    };

                    // Customize headers based on request condition
                    if (config.headers['browserDecidedReqHeader'] === 'Yes') {
                        delete config.headers['browserDecidedReqHeader'];
                    } else if (!config.headers['Content-Type']) {
                        config.headers['Content-Type'] = 'application/json';
                    }

                    return config;
                },
                (error: any) => {
                    return Promise.reject(error);
                }
            );
            /*
            HttpService.instance.interceptors.response.use(
                (response) => {
                    // Modify the response data here (e.g., parse, transform)            
                    return response;
                },
                (error) => {              
                    return Promise.reject(error);
                }
            );*/
        }
        return HttpService.instance;
    }
}
export default HttpService;
