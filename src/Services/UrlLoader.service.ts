import axios from "axios";
import {CustomError} from "../Types/CustomError.type";
import {BasicAuthHeaderInterface} from "../Interfaces/BasicAuthHeader.interface";

export class UrlLoaderService {

    /**
     * Creates a basic auth header and returns it as an object
     *
     * @param username
     * @param password
     */
    createBasicAuthHeader(username: string, password: string): BasicAuthHeaderInterface {
        return {
            headers: {
                Authorization: 'Basic ' + btoa(username + ':' + password)
            }
        }
    }

    async loadPage(url: string, authHeaders?: BasicAuthHeaderInterface): Promise<string> {
        try {
            // const axiosConfig = {
            //     headers: authHeaders ? authHeaders.headers : {},
            //     withCredentials: false // Prevent the browser from asking for credentials
            // };

            const response = ( authHeaders ) ? await axios.get(url, authHeaders) : await axios.get(url);

            return response.data;
        } catch (error) {
            // Wirf einen neuen CustomError mit der Beschreibung und dem originalen Fehler
            throw new CustomError('Error loading page', error);
        }
    }

    async loadPageByPost(url: string, formData: FormData, authHeaders?: BasicAuthHeaderInterface): Promise<string> {
        try {
            // const axiosConfig = {
            //     headers: authHeaders ? authHeaders.headers : {},
            //     withCredentials: false // Prevent the browser from asking for credentials
            // };

            const response = ( authHeaders ) ? await axios.post(url, formData, authHeaders) : await axios.post(url, formData);

            return response.data;
        } catch (error) {
            // Wirf einen neuen CustomError mit der Beschreibung und dem originalen Fehler
            throw new CustomError('Error loading page', error);
        }
    }

}