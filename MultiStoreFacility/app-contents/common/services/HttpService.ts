import axios from 'axios';

class HttpService {

    private static options = {
        timeout: 10 * 1000 // Set a timeout of 10 seconds
    };

    static async getApi(url: string, options?: any) {

        if(!options)
            options = HttpService.options;

        try {
            return await axios.get(url, options);
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async postApi(url: string, body: any, options?: any) {

        if(!options)
            options = HttpService.options;

        try {
            return await axios.post(url, body, options);
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async patchApi(url: string, body: any, options?: any) {

        if(!options)
            options = HttpService.options;

        try {
            return await axios.patch(url, body, options);
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async deleteApi(url: string, options?: any) {

        if(!options)
            options = HttpService.options;

        try {
            return await axios.delete(url, options);
        } catch (error) {
            HttpService.handleError(error);
            throw error;
        }
    }

    static async updateApi(url: string, body: any, options?: any) {

        if(!options)
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

    public static setNetworkTimeout(time: number):void {
        
        HttpService.options.timeout = time;
    }
}
export default HttpService;
