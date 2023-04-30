import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_COMMANDE, ETAT, READ_CAISSE, READ_COMMANDE, READ_COMMANDE_CLIENT, READ_COMMANDE_TYPE, READ_LIGNE_COMMANDE_CLIENT, READ_ONE_COMMANDE } from 'src/app/shared/_elements/api_constant';
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
import { GenericService } from 'src/app/shared/_services/generic.service';

@Component({
  selector: 'app-lister-commande-client',
  templateUrl: './lister-commande-client.component.html',
  styleUrls: ['./lister-commande-client.component.scss']
})
export class ListerCommandeClientComponent implements OnInit {

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
  page = 0; // Page courante
  pageSize = 5; // Nombre d'éléments par page

  public dataRead!: CommandeResponseModel;
  public dataReadLigne: LigneCommandeResponsetModel[] = [];
  public modalOpen1 = false;
  public modalOpen2 = false;
  collectionSize: any;
  token = '';
  document = '';
  type = 'client';
  constructor(
    private genericService: GenericService,
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

    this.getCommandeClient(this.token, this.document);
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
  onChangeSize(event: any) {
    console.log(event);
    this.pageSize = event.target.value;
    this.page = 0;
    this.getCommandeClient(this.token, this.document);
  }

  // tslint:disable-next-line: typedef
  search(event: any) {
    console.log(event);
    this.getCommandeClient(event.target.value, event.target.value);
  }


  // tslint:disable-next-line: typedef
  onPageChange(event: any) {
    this.page = event - 1;
    this.getCommandeClient(this.token, this.document);
  }


  // tslint:disable-next-line: typedef
  getCommandeClient(token: any, document: any) {
    // tslint:disable-next-line: max-line-length
    this.commandeService.get(`${READ_COMMANDE_CLIENT}?token=${token}&type=${this.type}&document=${document}&page=${this.page}&size=${this.pageSize}`).then((response: any) => {
      this.data = response.data.content;
      
      this.collectionSize = response.data.totalElements;
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
    this.ligneCommandeService.get(READ_LIGNE_COMMANDE_CLIENT + '/' + id).then((responseLigne: any) => {
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


  // tslint:disable-next-line: typedef
  aRegler(commande: any) {
    this.modalOpen1 = false;
    this.modalOpen2 = true;
    // tslint:disathis.submitted = true;
    this.isDisabled = true;
    this.initFormLogin(commande, this.dataCaisse);
    console.log(commande);
  }

  // tslint:disable-next-line: typedef
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


  // tslint:disable-next-line: typedef
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
          // tslint:disable-next-line: no-shadowed-variable
          .then((result: any) => {
            this.data = result.data;
            console.log(result);
            Swal.fire({
              title: 'Facture enregistré!',
              text: 'La fature a été genéré avec succès.',
              icon: 'success',
              confirmButtonColor: '#28a745'
            });
            this.getCommandeClient(this.token, this.document);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la Generation de la facture',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getCommandeClient(this.token, this.document);
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
          this.getCommandeClient(this.token, this.document);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getCommandeClient(this.token, this.document);
      }
    });
  }


  // tslint:disable-next-line: typedef
  recupId(commande: CommandeResponseModel) {
    this.router.navigate(['achats/commande/ajouter/', commande.id]);
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
