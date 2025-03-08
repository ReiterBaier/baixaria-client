import { Api } from "../../api-config";
import { CreateDownloadQueueDto } from "./types";



export class DownloadQueueServices {

    async create(dto: CreateDownloadQueueDto): Promise<{jobId: {id: string}, message: string} | Error> {
        try {
            const request = await Api.post('/download-queue', dto);
            return request.data;
        } catch (error) {
            return new Error((error as {message: string}).message || 'Erro ao inserir registro na fila de download: ' + error)
        };
    };

    async getBoardQueue() {
        try {
            const request = await Api.get('/board/queues');
            return request.data;
        } catch (error) {
            return new Error((error as {message: string}).message || 'Erro ao abrir o dashboard: ' + error)
        };
    };

};