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
  dataActivite = [];
  pageSize: any;
  page!: number;
  collectionSize: any;

  constructor(
    private tokenStorage: TokenStorageService,
    private utilisateurService: AuthService,
    private caisseService: CaisseService
  ) { }

  ngOnInit(): void {

    this.getUser();

  }

  // tslint:disable-next-line: typedef
  onChangeSize(event: any) {
    console.log(event);
    this.pageSize = event.target.value;
    this.page = 0;
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
    this.caisseService.get(READ_ACTIVITE + '/' + this.currentUser.username).then((response: any) => {
      this.dataActivite = response.data.content;
      this.collectionSize = response.data.totalElements;
      console.log(response);
    });
  }

}
