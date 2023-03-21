import { Component, ViewChild, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { READ_DEPOT, READ_ONE_PRODUIT, READ_PATIENT, READ_PRODUIT } from 'src/app/shared/_elements/api_constant';
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

@Component({
  selector: 'app-ajouter-commande',
  templateUrl: './ajouter-commande.component.html',
  styleUrls: ['./ajouter-commande.component.scss']
})
export class AjouterCommandeComponent implements OnInit {

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
  ligneCommandeSave: LigneCommandeRequestModel[] = [];
  model: any;

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
    this.initFormLigne(null);
    this.getPatient();
    this.getProduit();
    this.getDepot();

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
  get fLigne() { return this.formLigne.controls; }

  // tslint:disable-next-line: typedef
  public getPatient() {
    return this.patientService.get(READ_PATIENT).then((response: any) => {
      this.dataPatient = response.data;
      console.log(response);
      this.dataStatut.reverse();
    });
  }

  // tslint:disable-next-line: typedef
  public getProduit() {
    return this.produitService.get(READ_PRODUIT).then((response: any) => {
      this.dataProduit = response.data;
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
      document: [data ? data.document : '', Validators.required],
      statut: [data ? data.statut : ' ', Validators.required],
      idClientFournisseur: [data ? data.idClientFournisseur : ' ', Validators.required],
      LigneCommandes: [data ? data.LigneCommandes : this.ligneCommandeSave],
      idDepot: [data ? data.idDepot : '', Validators.required]
    });
  }

  private initFormLigne(dataLigneCommande: any) {
    this.formLigne = this.fb.group({
      idProduit: [dataLigneCommande ? dataLigneCommande.idProduit : null],
      qte: [dataLigneCommande ? dataLigneCommande.qte : null],
      idLigne: [dataLigneCommande ? dataLigneCommande.idLigne : ' ']

    });
  }

  // tslint:disable-next-line: typedef
  ajouterObjet() {
    this.produitService.get(READ_ONE_PRODUIT + '/' + this.fLigne.idProduit.value).then((response: any) => {
      console.log('response', response);
      this.isDisabled = true;
      const nouvelLigne = {
        id: 0,
        pt: response.data.pv * this.fLigne.qte.value,
        pv: response.data.pv,
        dci: response.data.dci,
        code: response.data.code,
        famille: response.data.famille.name,
        qte: this.fLigne.qte.value,
        idCommande: 0,
        idProduit: this.fLigne.idProduit.value,
        idLigne: this.fLigne.idLigne.value
      };
      const ligneToSave = {
        id: 0,
        pt: response.data.pv * this.fLigne.qte.value,
        qte: this.fLigne.qte.value,
        idCommande: 0,
        idProduit: this.fLigne.idProduit.value
      };

      this.ligneCommande.push(nouvelLigne);

      this.ligneCommandeSave.push(ligneToSave);
      this.somme = 0;
      this.ligneCommandeSave.forEach(item => {
        this.somme += item.pt;
      });
      console.log(this.ligneCommande);
    });
  }

  deleteLigne(i: number) {
    console.log(i);
    this.ligneCommande.splice(i, 1);
    this.ligneCommandeSave.splice(i, 1);
    this.somme = 0;
    this.ligneCommandeSave.forEach(item => {
      this.somme += item.pt;
    });
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
      this.f.idDepot.value,
      this.somme,
      'client',
      this.f.statut.value,
      this.f.document.value,
      this.f.idClientFournisseur.value,
      this.f.LigneCommandes.value,
    );
    console.log(dtoRequest);
    this.commandeService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Commande enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
        this.router.navigate(['/ventes/commande/ajouter']);
      });

    this.router.navigate(['ventes/commande/liste']);


  }

}
