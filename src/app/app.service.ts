import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {
    constructor(private http: HttpClient) { }

    getFiles(prefix, token) {
        return this.http.get(
            `https://obhstoragesa.blob.core.windows.net/obh-storage-container?restype=container&comp=list&prefix=${prefix}&delimiter=/&marker=&maxresults=30&include=metadata&${token}`,
            { responseType: 'text' }
        );
    }

    downloadFile(filePrefix, token) {
        return this.http.get(
            `https://obhstoragesa.blob.core.windows.net/obh-storage-container/${filePrefix}?${token}`,
            { responseType: 'text' }
        );
    }
}
