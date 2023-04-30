import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LAST_ACTIVITE, SIGNOUT } from '../shared/_elements/api_constant';
import { AuthService } from '../shared/_services/auth.service';
import { CaisseService } from '../shared/_services/caisse-service';
import { NotificationService } from '../shared/_services/notifiaction.service';
import { TokenStorageService } from '../shared/_services/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentUser!: any;
  currentToken!: any;
  dataLastConnexion: any;

  constructor(
    private tokenStorage: TokenStorageService,
    private utilisateurService: AuthService,
    private caisseService: CaisseService
  ) { }

  ngOnInit(): void {

    this.getUser();

  }

  // tslint:disable-next-line: typedef
  getUser() {
    this.currentUser = this.tokenStorage.getUser();
    if (this.currentUser) {
      this.getLastConnexion();
    }
    console.log(this.currentUser);
  }

  // tslint:disable-next-line: typedef
  signOut() {
    this.currentToken = this.tokenStorage.getToken();
    this.utilisateurService.signOut(SIGNOUT, 'deconnexion').then((response: any) => {
      console.log(response);
    });
    this.tokenStorage.signOut();

  }


  // tslint:disable-next-line: typedef
  getLastConnexion() {
    this.caisseService.get(LAST_ACTIVITE + '/' + this.currentUser.username).then((response: any) => {
      this.dataLastConnexion = response.data;
      console.log(response);
    });
  }

}
