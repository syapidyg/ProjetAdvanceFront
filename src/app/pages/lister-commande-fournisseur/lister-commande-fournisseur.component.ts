import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_COMMANDE, READ_CAISSE, READ_COMMANDE, READ_COMMANDE_FOURNISSEUR, READ_LIGNE_COMMANDE_FOURNISSEUR, READ_ONE_COMMANDE } from 'src/app/shared/_elements/api_constant';
import { CommandeResponseModel } from 'src/app/shared/_models/responses/commande-response.model';
import { BonToFactureRequestDto } from 'src/app/shared/_models/requests/bon-facture-request.model';
import { LigneCommandeResponsetModel } from 'src/app/shared/_models/responses/ligne-commande-response.model';
import { CommandeService } from 'src/app/shared/_services/commande.service';
import { LigneCommandeService } from 'src/app/shared/_services/ligne-commande.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import Swal from 'sweetalert2';
import { ReglementService } from 'src/app/shared/_services/reglement.service';
import { ReglementRequestModel } from 'src/app/shared/_models/requests/reglement-request.model';
import { CaisseService } from 'src/app/shared/_services/caisse-service';
import { CaisseResponseModel } from 'src/app/shared/_models/responses/caisse-response.model';

@Component({
  selector: 'app-lister-commande-fournisseur',
  templateUrl: './lister-commande-fournisseur.component.html',
  styleUrls: ['./lister-commande-fournisseur.component.scss']
})
export class ListerCommandeFournisseurComponent implements OnInit {

  public data: CommandeResponseModel[] = [];
  public dataCaisse: any[] = [];
  public dataReglement: any[] = [];
  public isDisabled = false;
  rendu = 0;
  reste = 0;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  isLoading!: boolean;
  submitted!: boolean;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: CommandeResponseModel;
  public dataReadLigne: LigneCommandeResponsetModel[] = [];
  public modalOpen1 = false;
  public modalOpen2 = false;
  constructor(
    private commandeService: CommandeService,
    private reglementService: ReglementService,
    private caisseService: CaisseService,
    private ligneCommandeService: LigneCommandeService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {

    this.getCommandeClient();
    this.getUser();
    this.initFormLogin(null, null);
    this.getCaisse();

  }

  getRemboursement(): number {
    this.reste = this.f.pt.value - this.f.rendu.value;
    return this.reste;
  }

  // tslint:disable-next-line: typedef
  private initFormLogin(data: any, dataCaisse: any) {
    this.form = this.fb.group({
      idCommande: [data ? data.id : null],
      idCaisse: [dataCaisse ? dataCaisse.idCaisse : ' ', Validators.required],
      pt: [data ? data.pt : ' ', Validators.required],
      rendu: [this.rendu ? this.rendu : ' ', Validators.required],
      reste: [this.reste ? this.reste : ' '],
    });
  }

  // tslint:disable-next-line: typedef
  getUser() {
    this.currentUser = this.tokenStorage.getUser();
  }

  // tslint:disable-next-line: typedef
  get f() { return this.form.controls; }


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
    this.commandeService.get(READ_COMMANDE_FOURNISSEUR).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  readOneCommande(commande: any) {
    this.modalOpen2 = false;
    this.modalOpen1 = true;
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
  getCaisse() {
    this.caisseService.get(READ_CAISSE).then((response: any) => {
      this.dataCaisse = response.data;
      console.log(response);
    });
  }


  aRegler(commande: any) {
    this.modalOpen1 = false;
    this.modalOpen2 = true;
    // tslint:disathis.submitted = true;
    this.isDisabled = true;
    this.initFormLogin(commande, this.dataCaisse);
    console.log(commande);
  }

  reglerCommande() {
    this.submitted = true;
    this.isLoading = true;
    this.isDisabled = true;
    if (this.form.invalid) {
      this.isLoading = !this.isLoading;
      return;
    }
    let dtoRequest;
    // tslint:disable-next-line: max-line-length
    dtoRequest = new ReglementRequestModel(
      0,
      this.f.idCommande.value,
      this.currentUser.id,
      this.f.idCaisse.value,
      this.f.pt.value,
      this.f.rendu.value,
      this.reste
    );
    console.log(dtoRequest);
    this.reglementService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Reglement enregistré avec succès ');
        this.router.navigate(['achats/commande/reglement']);
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
      });

  }


  transformCommande(commande: any) {
    let dtoRequest: BonToFactureRequestDto;
    dtoRequest = new BonToFactureRequestDto(
      commande.id,
      commande.idDepot
    );

    console.log('transformdto', dtoRequest);
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Genérer une facture pour ce bon de commande',
      icon: 'warning',
      iconColor: 'rgb(250, 214, 53)',
      showCancelButton: true,
      confirmButtonText: 'Oui, Generer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#28a746e1',
      cancelButtonColor: '#6c757dbe'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.postbtf(dtoRequest).toPromise()
          .then((result: any) => {
            this.data = result.data;
            console.log(result);
            Swal.fire({
              title: 'Facture enregistré!',
              text: 'La fature a été genéré avec succès.',
              icon: 'success',
              confirmButtonColor: '#28a745'
            });
            this.getCommandeClient();
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la Generation de la facture',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getCommandeClient();
      }
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


  // tslint:disable-next-line: typedef
  recupId(commande: CommandeResponseModel) {
    this.router.navigate(['achats/commande/ajouter/', commande.id]);
  }

}
