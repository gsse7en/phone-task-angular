import axios from 'axios';
import { AxiosInstance } from 'axios';
import { Injectable } from '@angular/core';


export interface Params {
    [key: string]: any;
}

export interface GetOptions {
    url: string;
    params?: Params;
}

export interface ErrorResponse {
    id: string;
    code: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})

export class ApiClient {

    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            timeout: 3000
        });
    }

    public async get<T>(options: GetOptions): Promise<T> {

        try {
            const axiosResponse = await this.axiosClient.request<T>({
                method: 'get',
                url: options.url,
                params: options.params
            });

            return (axiosResponse.data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

}
