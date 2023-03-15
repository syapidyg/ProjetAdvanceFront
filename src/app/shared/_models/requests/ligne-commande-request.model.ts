export class LigneCommandeRequestModel {
    constructor(
        public id: number,
        public pt: number,
        public qte: number,
        public idCommande: number,
        public idProduit: number
    ) {

    }
}
