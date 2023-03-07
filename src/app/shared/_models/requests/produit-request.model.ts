export class ProduitRequestModel {
    constructor(
        public id: number,
        public idfamille: number,
        public dci: string,
        public forme: string,
        public categorie: string,
        public dosage: string,
        public pa: number,
        public pv: number,
    ) {

    }
}