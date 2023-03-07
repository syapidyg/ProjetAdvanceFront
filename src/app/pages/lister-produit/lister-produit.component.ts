import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_PRODUIT, READ_ONE_PRODUIT, READ_PRODUIT } from 'src/app/shared/_elements/api_constant';
import { ProduitResponseModel } from 'src/app/shared/_models/responses/produit-response.model';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { ProduitService } from 'src/app/shared/_services/produit-service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lister-produit',
  templateUrl: './lister-produit.component.html',
  styleUrls: ['./lister-produit.component.scss']
})
export class ListerProduitComponent implements OnInit {


  public data: ProduitResponseModel[] = [];
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: ProduitResponseModel;

  constructor(
    private produitService: ProduitService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {

    this.getProduit();

  }

  onPageChange(pageNumber: number) {
    this.p = pageNumber;
  }

  onPageSizeChange() {
    this.collectionSize = this.data.length;
    this.p = 1;
  }


  // tslint:disable-next-line: typedef
  getProduit() {
    this.produitService.get(READ_PRODUIT).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  readOneProduit(produit: any) {
    this.produitService.get(READ_ONE_PRODUIT + '/' + produit.id).then((response: any) => {
      this.dataRead = response.data;
      console.log(response);
    });

  }

  // tslint:disable-next-line: typedef
  deleteProduit(produit: ProduitResponseModel) {
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
        this.produitService.delete(DELETE_PRODUIT + '/' + produit.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getProduit();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getProduit();
      }
    });
  }

  // readOneProduit(produit: any) {
  //   this.produitService.get(READ_ONE_PRODUIT + '/' + produit.id).then((response: any) => {
  //     console.log(response);
  //     this.isDisabled = true;
  //     this.dataRead = response.data;
  //     console.log(this.dataRead);
  //   });
  // }

 

  recupId(produit: ProduitResponseModel) {
    this.router.navigate(['/produits/ajouter/', produit.id]);
  }

}
