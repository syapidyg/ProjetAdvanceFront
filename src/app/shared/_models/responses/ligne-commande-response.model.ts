import { ProduitResponseModel } from "./produit-response.model";

export class LigneCommandeRequestModel {
    constructor(
        public id: number,
        public qte: number,
        public idCommande: number,
        public produit: ProduitResponseModel
    ) {

    }
}
