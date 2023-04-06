/* tslint:disable:triple-equals */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {UserRequestModel} from '../_models/requests/user-request.model';
import {TokenStorageService} from './token-storage.service';
import { AUTH } from '../_elements/api_constant';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService,
  ) { }

  public login(credentials: UserRequestModel): Observable<any> {
    return this.http.post(`${AUTH}`,
      new UserRequestModel(credentials.username, credentials.password), httpOptions);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AUTH + 'user', httpOptions);
  }

  // tslint:disable-next-line: typedef
  public signOut(url: string, statut: string) {
    return this.http.post(url, statut).toPromise();
  }


}
