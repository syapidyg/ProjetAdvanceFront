import { Injectable, SecurityContext } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from "@angular/common/http";
import { CaisseRequestModel } from "../_models/requests/caisse-request.model";
import { Observable } from "rxjs";
import { ADD_CAISSE } from "../_elements/api_constant";
import { environment } from "src/environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
import * as FileSaver from 'file-saver';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const PDF_EXTENSION = '.pdf';
const PDF_TYPE = 'application/pdf';


@Injectable({
    providedIn: 'root',
})

export class GenericService {

    constructor(
        private http: HttpClient,
        protected sanitizer: DomSanitizer,

    ) {

    }

    public reportPostResource(path: string, data: any) {
        return this.http.post(path, data, {
            observe: 'response',
            responseType: 'arraybuffer' as 'json'
        }).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
    private handleError(error: any) {
        const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Promise.reject(errMsg);
    }

    private extractData(res: HttpResponse<any>) {
        let body;
        if (res) {
            body = res.body;
        }
        return body;
    }

    public getByteArrayAndSaveReportPDF(value: any, filename: string) {
        let file;
        // console.log(file);
        file = new Blob([value], { type: PDF_TYPE });
        // la ligne suivante telecharge et enregistre directement en pdf dans le repertoire telechargement
        // FileSaver.saveAs(file, filename + new Date().getTime() + PDF_EXTENSION);
        // @ts-ignore
        const isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) {
            console.log('value', isFirefox);
            FileSaver.saveAs(file, filename + new Date().getTime() + PDF_EXTENSION);
        } else {
            console.log('value2', isFirefox);
            const blobUrl = URL.createObjectURL(file);
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            // Sans DOMSanitizer cela peut bien marcher mais le navigateur ne reconnait pas ce binaire comme une ressource sûre.
            // iframe.src = blobUrl;
            // DOMSanitizer permet d'en faire une ressource sûre.
            // tslint:disable-next-line: max-line-length
            const dataIframe = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
            if (dataIframe) {
                iframe.src = dataIframe;
                document.body.appendChild(iframe);

                iframe.contentWindow ? iframe.contentWindow.print() : '';
            }

        }
    }
}