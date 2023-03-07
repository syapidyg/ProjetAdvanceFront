import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ADD_CAISSE, ADD_PRODUIT } from '../_elements/api_constant';
import { ProduitRequestModel } from '../_models/requests/produit-request.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class ProduitService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: ProduitRequestModel) {
        return this.http.post(`${ADD_PRODUIT}`,
            new ProduitRequestModel(
                credentials.id,
                credentials.idfamille,
                credentials.dci,
                credentials.forme,
                credentials.categorie,
                credentials.dosage,
                credentials.pa,
                credentials.pv,
                ), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}