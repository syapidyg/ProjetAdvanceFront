export class ReglementRequestModel {
    constructor(
        public id: number,
        public idCommande: number,
        public idUtilisateur: number,
        public idCaisse: number,
        public montant: number,
        public rendu: number,
        public reste: number,
    ) {

    }
}