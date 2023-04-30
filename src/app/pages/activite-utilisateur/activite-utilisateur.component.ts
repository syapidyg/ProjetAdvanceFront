import { Component, OnInit } from '@angular/core';
import { READ_ACTIVITE } from 'src/app/shared/_elements/api_constant';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { CaisseService } from 'src/app/shared/_services/caisse-service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-activite-utilisateur',
  templateUrl: './activite-utilisateur.component.html',
  styleUrls: ['./activite-utilisateur.component.scss']
})
export class ActiviteUtilisateurComponent implements OnInit {

  currentUser!: any;
  currentToken!: any;
  dataActivite!: any;
  // Pagination options
  page = 0; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize!: any;
  token = '';

  constructor(
    private tokenStorage: TokenStorageService,
    private utilisateurService: AuthService,
    private caisseService: CaisseService
  ) { }

  ngOnInit(): void {

    this.getUser();
    this.readActivite();

  }

  // tslint:disable-next-line: typedef
  onChangeSize(event: any) {
    console.log(event);
    this.pageSize = event.target.value;
    this.page = 0;
    this.readActivite();
  }

  // tslint:disable-next-line: typedef
  search(event: any) {
    console.log(event);
    this.readActivite();
  }


  // tslint:disable-next-line: typedef
  onPageChange(event: any) {
    this.page = event - 1;
    this.readActivite();
  }

  // tslint:disable-next-line: typedef
  getUser() {
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser);
    this.readActivite();
  }

  // tslint:disable-next-line: typedef
  readActivite() {
    // tslint:disable-next-line: max-line-length
    let ACTIVITE = READ_ACTIVITE + '/' + this.currentUser.username;
    this.caisseService.get(`${ACTIVITE}?page=${this.page}&size=${this.pageSize}`).then((response: any) => {
      this.dataActivite = response.data.content;
      this.collectionSize = response.data.totalElements;
      console.log('activite', this.dataActivite);
      console.log('reponse', response);
    });
  }

}
