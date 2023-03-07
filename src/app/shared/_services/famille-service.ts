import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ADD_CAISSE, ADD_FAMILLE } from '../_elements/api_constant';
import { FamilleRequestModel } from '../_models/requests/famille-request.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class FamilleService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: FamilleRequestModel) {
        return this.http.post(`${ADD_FAMILLE}`,
            new FamilleRequestModel(credentials.id, credentials.name, credentials.rayon, credentials.description), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}