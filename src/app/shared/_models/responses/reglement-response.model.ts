export class ReglementResponseModel {
    constructor(
        public id: number,
        public idCommande: number,
        public idCaisse: number,
        public montant: number,
        public date: Date
    ) {

    }
}