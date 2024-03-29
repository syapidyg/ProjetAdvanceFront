import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_COMMANDE, TRANSFORM_COMMANDE } from '../_elements/api_constant';
import { CommandeRequestModel } from '../_models/requests/commande-request.model';
import { BonToFactureRequestDto } from '../_models/requests/bon-facture-request.model';
import { CommandeStockRequestModel } from '../_models/requests/commande-stock-request.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class CommandeService {

    constructor(private http: HttpClient) {

    }

    // tslint:disable-next-line: typedef
    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    // tslint:disable-next-line: typedef
    public post(credentials: CommandeRequestModel) {
        return this.http.post(`${ADD_COMMANDE}`,
            new CommandeRequestModel(
                credentials.id,
                credentials.code,
                credentials.idDepot,
                credentials.pt,
                credentials.type,
                credentials.statut,
                credentials.document,
                credentials.idClientFournisseur,
                credentials.LigneCommandes,
            ), httpOptions);
    }

    // tslint:disable-next-line: typedef
    public postTransfert(credentials: CommandeStockRequestModel) {
        return this.http.post(`${ADD_COMMANDE}`,
            new CommandeStockRequestModel(
                credentials.id,
                credentials.code,
                credentials.idDepot,
                credentials.idDepotDestination,
                credentials.pt,
                credentials.type,
                credentials.statut,
                credentials.document,
                credentials.idClientFournisseur,
                credentials.LigneCommandes,
            ), httpOptions);
    }

    // tslint:disable-next-line: typedef
    public postbtf(credentials: BonToFactureRequestDto) {
        return this.http.post(`${TRANSFORM_COMMANDE}`,
            new BonToFactureRequestDto(
                credentials.idCommande,
                credentials.idDepot,
            ), httpOptions);
    }


    // tslint:disable-next-line: typedef
    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}
