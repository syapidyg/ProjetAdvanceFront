import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_EMPLOYE } from '../_elements/api_constant';
import { EmployeEditerRequestModel } from '../_models/requests/employe-editer-request.model';
import { EmployeRequestModel } from '../_models/requests/employe-request.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) {

  }

  // tslint:disable-next-line: typedef
  public get(url: string) {
    return this.http.get(url).toPromise();
  }

  public post(credentials: EmployeRequestModel) {
    return this.http.post(`${ADD_EMPLOYE}`,
      // tslint:disable-next-line: max-line-length
      new EmployeRequestModel(credentials.id, credentials.nom, credentials.prenom, credentials.birthday, credentials.email, credentials.number, credentials.username, credentials.password), httpOptions);
  }

  public postEdit(credentials: EmployeEditerRequestModel) {
    return this.http.post(`${ADD_EMPLOYE}`,
      // tslint:disable-next-line: max-line-length
      new EmployeEditerRequestModel(credentials.id, credentials.nom, credentials.prenom, credentials.birthday, credentials.email, credentials.number), httpOptions);
  }


  public delete(url: string) {
    return this.http.delete(url).toPromise();
  }

}