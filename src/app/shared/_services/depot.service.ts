import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { DepotRequestModel } from "../_models/requests/depot-request.model";
import { Observable } from "rxjs";
import { ADD_DEPOT } from "../_elements/api_constant";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class DepotService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: DepotRequestModel) {
        return this.http.post(`${ADD_DEPOT}`,
            new DepotRequestModel(credentials.id, credentials.name, credentials.description), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}