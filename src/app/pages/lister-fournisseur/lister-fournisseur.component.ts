import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_FOURNISSEUR, READ_FOURNISSEUR, READ_ONE_FOURNISSEUR } from 'src/app/shared/_elements/api_constant';
import { FournisseurResponseModel } from 'src/app/shared/_models/responses/fournisseur-response.model';
import { FournisseurService } from 'src/app/shared/_services/fournisseur.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lister-fournisseur',
  templateUrl: './lister-fournisseur.component.html',
  styleUrls: ['./lister-fournisseur.component.scss']
})
export class ListerFournisseurComponent implements OnInit {

  public data: FournisseurResponseModel[] = [];
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: FournisseurResponseModel;


  constructor(
    private fournisseurService: FournisseurService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
  ) { }

  ngOnInit(): void {

    this.getFournisseur();
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
  getFournisseur() {
    this.fournisseurService.get(READ_FOURNISSEUR).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  readOneFournisseur(fournisseur: any) {
    this.fournisseurService.get(READ_ONE_FOURNISSEUR + '/' + fournisseur.id).then((response: any) => {
      this.dataRead = response.data;
      console.log(response);
    });

  }

  // tslint:disable-next-line: typedef
  deleteFournisseur(fournisseur: FournisseurResponseModel) {
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
        this.fournisseurService.delete(DELETE_FOURNISSEUR + '/' + fournisseur.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getFournisseur();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getFournisseur();
      }
    });
  }

  // readOneFournisseur(fournisseur: any) {
  //   this.fournisseurService.get(READ_ONE_FOURNISSEUR + '/' + fournisseur.id).then((response: any) => {
  //     console.log(response);
  //     this.isDisabled = true;
  //     this.dataRead = response.data;
  //     console.log(this.dataRead);
  //   });
  // }

  // tslint:disable-next-line: typedef
  recupId(fournisseur: FournisseurResponseModel) {
    this.router.navigate(['/fournisseurs/ajouter/', fournisseur.id]);
  }

}

