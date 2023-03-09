import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_FOURNISSEUR } from '../_elements/api_constant';
import { FournisseurRequestModel } from '../_models/requests/fournisseur-request.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  constructor(private http: HttpClient) {

  }

  public get(url: string) {
    return this.http.get(url).toPromise();
  }

  public post(credentials: FournisseurRequestModel) {
    return this.http.post(`${ADD_FOURNISSEUR}`,
      new FournisseurRequestModel(
        credentials.id,
        credentials.name,
        credentials.number,
        credentials.email,
        credentials.adress,
        credentials.city
      ), httpOptions);
  }


  public delete(url: string) {
    return this.http.delete(url).toPromise();
  }

}