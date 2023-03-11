export class EmployeEditerRequestModel {
    constructor(
        public id: string,
        public nom: string,
        public prenom: string,
        public birthday: Date,
        public email: string,
        // tslint:disable-next-line: variable-name
        public number: number,
    ) {

    }
}