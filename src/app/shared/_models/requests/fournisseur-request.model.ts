export class FournisseurRequestModel {
    constructor(
        public id: number,
        public name: string,
        // tslint:disable-next-line: variable-name
        public number: string,
        public email: string,
        public adress: string,
        public city: string
    ) {

    }
}