import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  ADD_PATIENT} from '../_elements/api_constant';
import { PatientRequestModel } from '../_models/requests/patient-request.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class PatientService {

    constructor(private http: HttpClient) {

    }

    public get(url: string) {
        return this.http.get(url).toPromise();
    }

    public post(credentials: PatientRequestModel) {
        return this.http.post(`${ADD_PATIENT}`,
            new PatientRequestModel(
                credentials.id,
                credentials.name,
                credentials.number,
                credentials.email,
            ), httpOptions);
    }


    public delete(url: string) {
        return this.http.delete(url).toPromise();
    }

}