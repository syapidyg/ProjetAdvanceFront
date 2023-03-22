import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_REGLEMENT, READ_REGLEMENT, READ_ONE_REGLEMENT, READ_ONE_COMMANDE, READ_LIGNE_COMMANDE_FOURNISSEUR, READ_REGLEMENT_FOURNISSEUR } from 'src/app/shared/_elements/api_constant';
import { ReglementResponseModel } from 'src/app/shared/_models/responses/reglement-response.model';
import { ReglementService } from 'src/app/shared/_services/reglement.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import Swal from 'sweetalert2';
import { CommandeService } from 'src/app/shared/_services/commande.service';
import { LigneCommandeService } from 'src/app/shared/_services/ligne-commande.service';
import { CommandeResponseModel } from 'src/app/shared/_models/responses/commande-response.model';
import { LigneCommandeResponsetModel } from 'src/app/shared/_models/responses/ligne-commande-response.model';


@Component({
  selector: 'app-lister-reglement-fournisseur',
  templateUrl: './lister-reglement-fournisseur.component.html',
  styleUrls: ['./lister-reglement-fournisseur.component.scss']
})
export class ListerReglementFournisseurComponent implements OnInit {

  public data: ReglementResponseModel[] = [];
  public dataf: any[] = [];
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: CommandeResponseModel;
  dataReadLigne: LigneCommandeResponsetModel[] = [];



  constructor(
    private reglementService: ReglementService,
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
  ) { }

  ngOnInit(): void {

    this.getReglementFournisseur();
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
  getReglementFournisseur() {
    this.reglementService.get(READ_REGLEMENT_FOURNISSEUR).then((response: any) => {
      this.dataf = response.data;
      console.log('fournisseur', response);
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
    this.ligneCommandeService.get(READ_LIGNE_COMMANDE_FOURNISSEUR + '/' + id).then((responseLigne: any) => {
      this.dataReadLigne = responseLigne.data;
      console.log('LigneCommande', responseLigne);
      this.isDisabled = true;

    });
  }

  // tslint:disable-next-line: typedef
  readOneReglement(reglement: any) {
    this.reglementService.get(READ_ONE_REGLEMENT + '/' + reglement.id).then((response: any) => {
      this.dataRead = response.data;
      console.log(response);
    });

  }

  // tslint:disable-next-line: typedef
  deleteReglement(reglement: ReglementResponseModel) {
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
        this.reglementService.delete(DELETE_REGLEMENT + '/' + reglement.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getReglementFournisseur();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getReglementFournisseur();
      }
    });
  }

  // readOneReglement(reglement: any) {
  //   this.reglementService.get(READ_ONE_REGLEMENT + '/' + reglement.id).then((response: any) => {
  //     console.log(response);
  //     this.isDisabled = true;
  //     this.dataRead = response.data;
  //     console.log(this.dataRead);
  //   });
  // }

  // tslint:disable-next-line: typedef
  recupId(reglement: ReglementResponseModel) {
    this.router.navigate(['/reglements/ajouter/', reglement.id]);
  }

}

