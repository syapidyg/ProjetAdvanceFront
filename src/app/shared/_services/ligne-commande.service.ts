import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_COMMANDE } from '../_elements/api_constant';
import { LigneCommandeRequestModel } from '../_models/requests/ligne-commande-request.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class LigneCommandeService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: LigneCommandeRequestModel) {
        return this.http.post(`${ADD_COMMANDE}`,
            new LigneCommandeRequestModel(
                credentials.id,
                credentials.pt,
                credentials.qte,
                credentials.idCommande,
                credentials.idProduit
            ), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}