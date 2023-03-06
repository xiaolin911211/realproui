import axios from "axios";
import {HTTP_HEADER, HTTP_TIMEOUT} from "../common/constants";

export const httpCommonPost = async (url, request,token) => {

    const header = HTTP_HEADER;
    header.Authorization = 'Bearer ' + token;

    const httpRequest = JSON.stringify(request);


    try {
        const response = await axios.post(url, httpRequest, {
            headers: header,
            timeout: HTTP_TIMEOUT,
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const httpCommonPut= async (url, request,token) => {

    const header = HTTP_HEADER;
    header.Authorization = 'Bearer ' + token;

    const httpRequest = JSON.stringify(request);

    try {
        const response = await axios.put(url, httpRequest, {
            headers: header,
            timeout: HTTP_TIMEOUT,
        });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const httpCommonGet = async (url,uriParams,token) => {

    const header = HTTP_HEADER;
    header.Authorization = 'Bearer ' + token;


    try {
        const response = await axios.get(url, {
            timeout: HTTP_TIMEOUT,
            headers: header,
            params: uriParams
    });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

