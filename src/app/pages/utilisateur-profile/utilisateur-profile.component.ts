import { Component, OnInit } from '@angular/core';
import { LAST_ACTIVITE } from 'src/app/shared/_elements/api_constant';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { CaisseService } from 'src/app/shared/_services/caisse-service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-utilisateur-profile',
  templateUrl: './utilisateur-profile.component.html',
  styleUrls: ['./utilisateur-profile.component.scss']
})
export class UtilisateurProfileComponent implements OnInit {
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
    console.log('user', this.currentUser);
  }

  // tslint:disable-next-line: typedef
  getLastConnexion() {
    this.caisseService.get(LAST_ACTIVITE + '/' + this.currentUser.username).then((response: any) => {
      this.dataLastConnexion = response.data;
      console.log(response);
    });
  }

}
