import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { CaisseRequestModel } from "../_models/requests/caisse-request.model";
import { Observable } from "rxjs";
import { ADD_CAISSE } from "../_elements/api_constant";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class CaisseService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }
   
    public post(credentials: CaisseRequestModel) {
        return this.http.post(`${ADD_CAISSE}`,
            new CaisseRequestModel(credentials.id, credentials.name, credentials.description), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}