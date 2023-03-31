import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { READ_COMMANDE, READ_COMMANDE_CLIENT, READ_DEPOT, READ_PATIENT, READ_PRODUIT } from '../shared/_elements/api_constant';
import { CaisseService } from '../shared/_services/caisse-service';
import { CommandeService } from '../shared/_services/commande.service';
import { LigneCommandeService } from '../shared/_services/ligne-commande.service';
import { NotificationService } from '../shared/_services/notifiaction.service';
import { ReglementService } from '../shared/_services/reglement.service';
import { TokenStorageService } from '../shared/_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  collectionSizeClientCommande: any;
  token = '';
  document = 'Facture';
  type = 'client';
  typeCommande = 'stock';
  dataClient: any;
  dataPatient: any;
  collectionSizePatient: any;
  dataProduit: any;
  collectionSizeProduit: any;
  collectionSizeDepot: any;
  dataDepot: any;
  collectionSizeCommande: any;
  dataCommande: any;
  constructor(
    private commandeService: CommandeService,
    private reglementService: ReglementService,
    private caisseService: CaisseService,
    private ligneCommandeService: LigneCommandeService,
    private router: Router,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService,
  ) { }


  ngOnInit(): void {

    this.getCommandeClient(this.token, this.document);
    this.getCommande(this.token, this.typeCommande);
    this.getClient();
    this.getProduit();
    this.getDepot();
  }

  // tslint:disable-next-line: typedef
  getCommandeClient(token: any, document: any) {
    // tslint:disable-next-line: max-line-length
    this.commandeService.get(`${READ_COMMANDE_CLIENT}?token=${token}&document=${document}`).then((response: any) => {
      this.dataClient = response.data.content;
      this.collectionSizeClientCommande = response.data.totalElements;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  getCommande(token: any, type: any) {
    // tslint:disable-next-line: max-line-length
    this.commandeService.get(`${READ_COMMANDE}?token=${token}&type=${type}`).then((response: any) => {
      this.dataCommande = response.data.content;
      this.collectionSizeCommande = response.data.totalElements;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  getClient() {
    // tslint:disable-next-line: max-line-length
    this.commandeService.get(`${READ_PATIENT}`).then((response: any) => {
      this.dataPatient = response.data.content;
      this.collectionSizePatient = response.data.totalElements;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  getProduit() {
    // tslint:disable-next-line: max-line-length
    this.commandeService.get(`${READ_PRODUIT}`).then((response: any) => {
      this.dataProduit = response.data.content;
      this.collectionSizeProduit = response.data.totalElements;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  getDepot() {
    // tslint:disable-next-line: max-line-length
    this.commandeService.get(`${READ_DEPOT}`).then((response: any) => {
      this.dataDepot = response.data;
      this.collectionSizeDepot = response.data.length;
      console.log(response);
    });
  }



 
}
