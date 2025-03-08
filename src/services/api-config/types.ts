


export type ApiDefaultQueryParamsType<T = any> = {
    limit?: number;
    page?: number;
    order?: string;
} & {
    [key: string]: T;
};

export type ApiDefaultOrderParam = {
    order?: { [key: string]: 'ASC' | 'DESC' }
}



export type ApiDefaultGetAllResponseType<T> = {
    totalCount: number,
    totalPages: number,
    count: number,
    page: number,
    results: T[]
}

export type ApiDefaultCreatedResponseType = {
    id: string
}

export type ApiDefaultMessageResponseType = {
    message: string
}
