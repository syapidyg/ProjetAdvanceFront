import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { READ_DEPOT, READ_ONE_DEPOT, READ_ONE_PRODUIT, READ_PATIENT, READ_PRODUIT } from 'src/app/shared/_elements/api_constant';
import { CommandeRequestModel } from 'src/app/shared/_models/requests/commande-request.model';
import { CommandeResponseModel } from 'src/app/shared/_models/responses/commande-response.model';
import { PatientResponseModel } from 'src/app/shared/_models/responses/patient-response.model';
import { CommandeService } from 'src/app/shared/_services/commande.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { PatientService } from 'src/app/shared/_services/patient-service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import { ProduitService } from 'src/app/shared/_services/produit-service';
import { Select2Option } from 'ng-select2-component';
import { ProduitResponseModel } from 'src/app/shared/_models/responses/produit-response.model';
import { Observable, of, OperatorFunction, Subject, merge } from 'rxjs';
import { LigneCommandeRequestModel } from 'src/app/shared/_models/requests/ligne-commande-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JsonPipe, NgIf } from '@angular/common';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { DepotResponseModel } from 'src/app/shared/_models/responses/depot-response.model';
import { DepotService } from 'src/app/shared/_services/depot.service';
import { StockArticleService } from 'src/app/shared/_services/stock-article.service';

@Component({
  selector: 'app-ajouter-stock-article',
  templateUrl: './ajouter-stock-article.component.html',
  styleUrls: ['./ajouter-stock-article.component.scss']
})
export class AjouterStockArticleComponent implements OnInit {

  public data: CommandeResponseModel[] = [];
  public dataPatient: PatientResponseModel[] = [];
  public dataLigneCommande: any[] = [];
  public dataProduit: ProduitResponseModel[] = [];
  public dataDepot: DepotResponseModel[] = [];
  public dataStatut: any[] = [
    { name: 'Facture' },
    { name: 'Bon de commande' }
  ];
  somme = 0;
  currentUser!: any;
  form!: FormGroup;
  formLigne!: FormGroup;
  commande!: any;
  isLoading!: boolean;
  submitted!: boolean;
  i !: number;
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  id!: any;
  public isDisabled = false;
  ligneCommande: any[] = [];
  ligneCommandeSave: any[] = [];
  model: any;
  qte = 0;
  qteMax = 0;
  qteMin = 0;
  qteAlerte = 0;  selectedProduit!: number;
  constructor(
    private produitService: ProduitService,
    private depotService: DepotService,
    private patientService: PatientService,
    private commandeService: CommandeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.initForm(null);
    this.getProduit();
    this.getDepot();

  }

  incrementQte() {
    this.qte++;
    console.log(this.qte);
  }

  decrementQte() {
    this.qte--;
  }
 
  // editCommande(id: number) {
  //   this.commandeService.get(`${READ_ONE_COMMANDE}/${id}`)
  //     .then((response: any) => {
  //       console.log(response, response);
  //       this.initForm(response.data, response.data.famille);
  //     });
  // }


  // tslint:disable-next-line: typedef
  get f() { return this.form.controls; }

  // tslint:disable-next-line: typedef
  public getProduit() {
    return this.produitService.get(READ_PRODUIT).then((response: any) => {
      this.dataProduit = response.data.content;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  public getDepot() {
    return this.depotService.get(READ_DEPOT).then((response: any) => {
      this.dataDepot = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  private initForm(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      pt: [data ? data.pt : ' '],
      type: [data ? data.type : 'client'],
      qte: [data ? data.qte : '', Validators.required],
      LigneCommandes: [data ? data.LigneCommandes : this.ligneCommandeSave],
      idDepot: [data ? data.idDepot : '', Validators.required],
      idProduit: [data ? data.idProduit : '', Validators.required],
    });
  }

  // tslint:disable-next-line: typedef
  ajouterObjet() {
    this.produitService.get(READ_ONE_PRODUIT + '/' + this.f.idProduit.value).then((response: any) => {
      this.depotService.get(READ_ONE_DEPOT + '/' + this.f.idDepot.value).then((responseDepot: any) => {
        console.log('response', response);
        this.isDisabled = true;
        const nouvelLigne = {
          id: 0,
          produit: response.data.dci,
          code: response.data.code,
          qte: this.qte,
          depot: responseDepot.data.name
      };
        const ligneToSave = {
          id: 0,
          qte: this.qte,
          idCommande: 0,
          idProduit: this.f.idProduit.value
        };

        this.ligneCommande.push(nouvelLigne);
        this.ligneCommandeSave.push(ligneToSave);
        console.log(this.ligneCommande);
      });
    });
  }

  deleteLigne(i: number) {
    console.log(i);
    this.ligneCommande.splice(i, 1);
    this.ligneCommandeSave.splice(i, 1);
  }

  // tslint:disable-next-line: typedef
  save() {
    this.submitted = true;
    this.isLoading = true;
    this.isDisabled = false;
    if (this.form.invalid) {
      this.isLoading = !this.isLoading;
      return;
    }
    let dtoRequest;
    dtoRequest = new CommandeRequestModel(
      this.f.id.value,
      '',
      this.f.idDepot.value,
      0,
      'stock',
      '',
      'Entree en stock',
      0,
      this.f.LigneCommandes.value,
    );
    console.log(dtoRequest);
    this.commandeService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Entrée en stock enregistrée avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
        this.router.navigate(['/stocks/ajouter']);
      });

    this.router.navigate(['stocks/liste']);


  }

}
