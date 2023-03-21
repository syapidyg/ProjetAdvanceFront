import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { ReglementRequestModel } from "../_models/requests/reglement-request.model";
import { Observable } from "rxjs";
import { ADD_REGLEMENT } from "../_elements/api_constant";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class ReglementService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: ReglementRequestModel) {
        return this.http.post(`${ADD_REGLEMENT}`,
            // tslint:disable-next-line: max-line-length
            new ReglementRequestModel(credentials.id, credentials.idCommande, credentials.idUtilisateur, credentials.idCaisse, credentials.montant), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}