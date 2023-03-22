import { DepotResponseModel } from './depot-response.model';
import { ProduitResponseModel } from './produit-response.model';

export class StockArticleResponseModel {
    constructor(
        public id: number,
        public depot: DepotResponseModel,
        public produit: ProduitResponseModel,
        public qte: number,
        public qteAlerte: number,
        public qteMinimale: number,
        public qteMaximale: number
    ) {

    }
}