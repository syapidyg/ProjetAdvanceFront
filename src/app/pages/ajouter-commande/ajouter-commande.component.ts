import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { READ_PATIENT, READ_PRODUIT } from 'src/app/shared/_elements/api_constant';
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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-ajouter-commande',
  templateUrl: './ajouter-commande.component.html',
  styleUrls: ['./ajouter-commande.component.scss']
})
export class AjouterCommandeComponent implements OnInit {

  constructor(
    private produitService: ProduitService,
    private patientService: PatientService,
    private commandeService: CommandeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService

  ) { }

  public data: CommandeResponseModel[] = [];
  public dataPatient: PatientResponseModel[] = [];
  public dataLigneCommande: any[] = [];
  public dataProduit: ProduitResponseModel[] = [];

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
  optionFamille!: Select2Option[];
  optionCategorie!: Select2Option[];

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]> ;


  ngOnInit(): void {
    this.initForm(null);
    this.initFormLigne(null);
    this.getPatient();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }

  // tslint:disable-next-line: typedef
  get f() { return this.form.controls; }

  // tslint:disable-next-line: typedef
  get fLigne() { return this.formLigne.controls; }


  // editCommande(id: number) {
  //   this.commandeService.get(`${READ_ONE_PRODUIT}/${id}`)
  //     .then((response: any) => {
  //       console.log(response, response);
  //       this.initForm(response.data, response.data.famille);
  //     });
  // }

  // public selectFamille(): any{
  //   this.getfamille().then((data) => {
  //     this.optionFamille = data.map((famille) => {
  //       return { value: famille.id.toString(), label: famille.name };
  //     });
  //     console.log('optionFamille', this.optionFamille);
  //   });
  // }

  // public selectCategorie(): any {
  //   this.optionCategorie = this.categorieList.map((categorie) => {
  //     return { value: categorie.name, label: categorie.name };
  //   });
  // }

  // public selectForme(): any {
  //   this.optionForme = this.formeList.map((forme) => {
  //     return { value: forme.name, label: forme.name };
  //   });
  // }

  // tslint:disable-next-line: typedef
  public getPatient() {
    return this.patientService.get(READ_PATIENT).then((response: any) => {
      this.dataPatient = response.data;
      console.log(response);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  // tslint:disable-next-line: typedef
  public getProduit() {
    return this.produitService.get(READ_PRODUIT).then((response: any) => {
      this.dataProduit = response.data;
      console.log(response);
    });
  }





  // tslint:disable-next-line: typedef
  private initForm(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      pt: [data ? data.pt : ' '],
      type: [data ? data.dci : ' '],
      statut: [data ? data.statut : ' ', Validators.required],
      idClientFournisseur: [data ? data.idClientFournisseur : ' ', Validators.required],
      LigneCommandes: [data ? data.LigneCommandes : ' ', Validators.required],
    });
  }

  private initFormLigne(dataLigneCommande: any) {
    this.formLigne = this.fb.group({
      idProduit: [dataLigneCommande ? dataLigneCommande.idProduit : null],
      qte: [dataLigneCommande ? dataLigneCommande.dataLigneCommande : null]
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
      this.f.pt.value,
      this.f.type.value,
      this.f.statut.value,
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
        this.router.navigate(['/commandes/ajouter']);
      });

    this.router.navigate(['/commandes/liste']);


  }

}
