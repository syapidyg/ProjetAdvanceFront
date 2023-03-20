import { LigneCommandeRequestModel } from "../requests/ligne-commande-request.model";
import { FournisseurResponseModel } from "./fournisseur-response.model";
import { PatientResponseModel } from "./patient-response.model";

export class CommandeResponseModel {
    constructor(
        public id: number,
        public pt: number,
        // tslint:disable-next-line: variable-name
        public date_creation: Date,
        public type: string,
        public statut: string,
        public document: string,
        public client: PatientResponseModel,
        public fournisseur: FournisseurResponseModel,
        public LigneCommandes: LigneCommandeRequestModel[]
    ) {

    }
}
