import { AxiosResponse } from "axios";

// Aqui posso tratar alguma coisa no response das requisições caso eu queira;
export const responseInterceptor = (response: AxiosResponse) => {
    return response;
}