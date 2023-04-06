import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { CaisseService } from 'src/app/shared/_services/caisse-service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-information-utilisateur',
  templateUrl: './information-utilisateur.component.html',
  styleUrls: ['./information-utilisateur.component.scss']
})
export class InformationUtilisateurComponent implements OnInit {
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
    console.log(this.currentUser);
  }
}
