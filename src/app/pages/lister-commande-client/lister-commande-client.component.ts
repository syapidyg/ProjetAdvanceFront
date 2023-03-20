import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_COMMANDE, READ_COMMANDE, READ_COMMANDE_CLIENT, READ_LIGNE_COMMANDE_CLIENT, READ_ONE_COMMANDE } from 'src/app/shared/_elements/api_constant';
import { CommandeResponseModel } from 'src/app/shared/_models/responses/commande-response.model';
import { LigneCommandeResponsetModel } from 'src/app/shared/_models/responses/ligne-commande-response.model';
import { CommandeService } from 'src/app/shared/_services/commande.service';
import { LigneCommandeService } from 'src/app/shared/_services/ligne-commande.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lister-commande-client',
  templateUrl: './lister-commande-client.component.html',
  styleUrls: ['./lister-commande-client.component.scss']
})
export class ListerCommandeClientComponent implements OnInit {

  public data: CommandeResponseModel[] = [];
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: CommandeResponseModel;
  public dataReadLigne: LigneCommandeResponsetModel[] = [];

  constructor(
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {

    this.getCommandeClient();

  }

  // tslint:disable-next-line: typedef
  onPageChange(pageNumber: number) {
    this.p = pageNumber;
  }

  // tslint:disable-next-line: typedef
  onPageSizeChange() {
    this.collectionSize = this.data.length;
    this.p = 1;
  }

  // tslint:disable-next-line: typedef
  getCommandeClient() {
    this.commandeService.get(READ_COMMANDE_CLIENT).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  readOneCommande(commande: any) {
    this.commandeService.get(READ_ONE_COMMANDE + '/' + commande.id).then((response: any) => {
      this.dataRead = response.data;
      console.log(response);
    });
    this.readOneLigneCommande(commande.id);

  }

  // tslint:disable-next-line: typedef
  readOneLigneCommande(id: number) {
    this.ligneCommandeService.get(READ_LIGNE_COMMANDE_CLIENT + '/' + id).then((responseLigne: any) => {
      this.dataReadLigne = responseLigne.data;
      console.log('LigneCommande',responseLigne);
      this.isDisabled = true;

    });
  }

  // tslint:disable-next-line: typedef
  deleteCommande(commande: CommandeResponseModel) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous êtes sur le point de supprimer cet élément.',
      icon: 'warning',
      iconColor: 'rgb(250, 214, 53)',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#28a746e1',
      cancelButtonColor: '#6c757dbe'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.delete(DELETE_COMMANDE + '/' + commande.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getCommandeClient();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getCommandeClient();
      }
    });
  }

  // readOneCommande(commande: any) {
  //   this.commandeService.get(READ_ONE_COMMANDE + '/' + commande.id).then((response: any) => {
  //     console.log(response);
  //     this.isDisabled = true;
  //     this.dataRead = response.data;
  //     console.log(this.dataRead);
  //   });
  // }

  // tslint:disable-next-line: typedef
  recupId(commande: CommandeResponseModel) {
    this.router.navigate(['/commandes/ajouter/', commande.id]);
  }

}
