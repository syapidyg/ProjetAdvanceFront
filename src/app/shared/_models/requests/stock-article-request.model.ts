export class StockArticleRequestModel {
    constructor(
        public id: number,
        public idDepot: number,
        public idProduit: number,
        public qte: number,
        public qteAlerte: number,
        public qteMinimale: number,
        public qteMaximale: number
    ) {

    }
}
