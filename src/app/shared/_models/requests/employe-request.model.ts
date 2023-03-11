export class EmployeRequestModel {
    constructor(
        public id: string,
        public nom: string,
        public prenom: string,
        public birthday: Date,
        public email: string,
        // tslint:disable-next-line: variable-name
        public number: number,
        public username: string,
        public password: string,

    ) {

    }
}