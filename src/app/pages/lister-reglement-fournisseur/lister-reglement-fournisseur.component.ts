import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_REGLEMENT, READ_ONE_REGLEMENT, READ_ONE_COMMANDE, READ_LIGNE_COMMANDE_FOURNISSEUR, READ_REGLEMENT_FOURNISSEUR, ETAT } from 'src/app/shared/_elements/api_constant';
import { ReglementResponseModel } from 'src/app/shared/_models/responses/reglement-response.model';
import { ReglementService } from 'src/app/shared/_services/reglement.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import Swal from 'sweetalert2';
import { CommandeService } from 'src/app/shared/_services/commande.service';
import { LigneCommandeService } from 'src/app/shared/_services/ligne-commande.service';
import { CommandeResponseModel } from 'src/app/shared/_models/responses/commande-response.model';
import { LigneCommandeResponsetModel } from 'src/app/shared/_models/responses/ligne-commande-response.model';
import { GenericService } from 'src/app/shared/_services/generic.service';



@Component({
  selector: 'app-lister-reglement-fournisseur',
  templateUrl: './lister-reglement-fournisseur.component.html',
  styleUrls: ['./lister-reglement-fournisseur.component.scss']
})
export class ListerReglementFournisseurComponent implements OnInit {

  public data!: any;
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  page = 0; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  public dataRead!: CommandeResponseModel;
  dataReadLigne: LigneCommandeResponsetModel[] = [];
  token = '';
  collectionSize: any;



  constructor(
    private genericService: GenericService,
    private reglementService: ReglementService,
    private commandeService: CommandeService,
    private ligneCommandeService: LigneCommandeService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
  ) { }

  ngOnInit(): void {

    this.getReglementFournisseur(this.token);
  }

  // tslint:disable-next-line: typedef
  onChangeSize(event: any) {
    console.log(event);
    this.pageSize = event.target.value;
    this.page = 0;
    this.getReglementFournisseur(this.token);
  }

  // tslint:disable-next-line: typedef
  search(event: any) {
    console.log(event);
    this.getReglementFournisseur(event.target.value);
  }


  // tslint:disable-next-line: typedef
  onPageChange(event: any) {
    this.page = event - 1;
    this.getReglementFournisseur(this.token);
  }

  // tslint:disable-next-line: typedef
  getReglementFournisseur(token: any) {
    this.reglementService.get(`${READ_REGLEMENT_FOURNISSEUR}?token=${token}&page=${this.page}&size=${this.pageSize}`).then((response: any) => {
      this.data = response.data.content;
      this.collectionSize = response.data.totalElements;
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
          this.getReglementFournisseur(this.token);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getReglementFournisseur(this.token);
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

  imprimerDoc(id: number) {
    const typeDoc = 'Facture';
    const dto = {
      exporter: true,
      idEtat: 2,
      paramEtats: [
        {
          texte: 'ID',
          valeur: id
        }
      ]
    };
    console.log(dto);
    // const activity = this.activityService.open({
    //   style: 'color',
    //   text: '<div class="mt-2 display1 fg-darkBlue">Impression ...</div>',
    //   type: 'cycle',
    //   overlayColor: '#A7A0A0',
    // });
    this.genericService.reportPostResource(ETAT, dto)
      .then((result: any) => {
        //this.activityService.close(activity);
        console.log(result);
        const filename = typeDoc.split('-').join('_')
          + '_';
        this.genericService.getByteArrayAndSaveReportPDF(result, filename);
      })
      .catch((err) => {
        //this.activityService.close(activity);
      });
  }

}

