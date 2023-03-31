import { LigneCommandeRequestModel } from './ligne-commande-request.model';

export class CommandeRequestModel {
    constructor(
        public id: number,
        public code: string,
        public idDepot: number,
        public pt: number,
        public type: string,
        public statut: string,
        public document: string,
        public idClientFournisseur: number,
        public LigneCommandes: LigneCommandeRequestModel[]
    ) {

    }
}