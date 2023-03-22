import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ADD_STOCK_ARTICLE } from "../_elements/api_constant";
import { StockArticleRequestModel } from "../_models/requests/stock-article-request.model";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class StockArticleService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: StockArticleRequestModel) {
        return this.http.post(`${ADD_STOCK_ARTICLE}`,
            // tslint:disable-next-line: max-line-length
            new StockArticleRequestModel(
                credentials.id,
                credentials.idDepot,
                credentials.idProduit,
                credentials.qte,
                credentials.qteAlerte,
                credentials.qteMinimale,
                credentials.qteMaximale,
            ), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }
}
