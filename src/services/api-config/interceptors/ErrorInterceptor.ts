import { AxiosError } from "axios";



export const errorInterceptor = (error: AxiosError) => {

    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Falha ao conectar na API, verifique.'));
    }

    return Promise.reject(error);

};