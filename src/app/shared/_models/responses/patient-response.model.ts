export class PatientResponseModel {
    constructor(
        public id: number,
        public name: string,
        // tslint:disable-next-line: variable-name
        public number: string,
        public email: string

    ) {

    }
}