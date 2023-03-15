import { ProduitResponseModel } from "./produit-response.model";

export class LigneCommandeResponsetModel {
    constructor(
        public id: number,
        public pt: number,
        public qte: number,
        public produit: ProduitResponseModel
    ) {

    }
}
