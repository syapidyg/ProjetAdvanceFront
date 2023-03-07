import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Option } from 'ng-select2-component';
import { READ_FAMILLE, READ_ONE_PRODUIT, READ_PRODUIT } from 'src/app/shared/_elements/api_constant';
import { ProduitRequestModel } from 'src/app/shared/_models/requests/produit-request.model';
import { FamilleResponseModel } from 'src/app/shared/_models/responses/famille-reponse.model';
import { ProduitResponseModel } from 'src/app/shared/_models/responses/produit-response.model';
import { FamilleService } from 'src/app/shared/_services/famille-service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { ProduitService } from 'src/app/shared/_services/produit-service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';

@Component({
  selector: 'app-ajouter-produit',
  templateUrl: './ajouter-produit.component.html',
  styleUrls: ['./ajouter-produit.component.scss']
})
export class AjouterProduitComponent implements OnInit {

  public data: ProduitResponseModel[] = [];
  public datafamille: FamilleResponseModel[] = [];
  public tes = ['r', 'f', 'g'];
  currentUser!: any;
  form!: FormGroup;
  produit!: any;
  isLoading!: boolean;
  submitted!: boolean;
  i !: number;
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  id!: any;
  public isDisabled = false;
  optionFamille!: Select2Option[];
  optionCategorie!: Select2Option[];
  optionForme!: Select2Option[];
  categorieList: any[] = [
    { id: 1, name: 'Voie orale' },
    { id: 2, name: 'Injectable' },
    { id: 3, name: 'Dermique (Peau)' },
    { id: 4, name: 'Inhalement' },
    { id: 5, name: 'Rectale' }
  ];
  formeList: any[] = [
    { id: 1, name: 'Comprimé' },
    { id: 2, name: 'Capsule' },
    { id: 3, name: 'Liquide' },
    { id: 4, name: 'Pilule' },
    { id: 4, name: 'Pastille' },
    { id: 4, name: 'Poudre' },
    { id: 4, name: 'Suppositoire' },
    { id: 5, name: 'Ovule' }
  ];



  constructor(
    private produitService: ProduitService,
    private familleService: FamilleService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService

  ) { }

  ngOnInit(): void {

    this.initForm(null, null);
    this.getFamille();
    // this.id = this.route.snapshot.params.id;
    // console.log(this.id);
    // this.editProduit(this.id);
    // this.selectCategorie();
    // this.selectForme();

  }

  // tslint:disable-next-line: typedef
  // editProduit(id: number) {
  //   this.produitService.get(`${READ_ONE_PRODUIT}/${id}`)
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

  public getFamille() {
    return this.familleService.get(READ_FAMILLE).then((response: any) => {
      this.datafamille = response.data;
      console.log(response);
    });
  }





  // tslint:disable-next-line: typedef
  private initForm(data: any, datafamille: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      idfamille: [datafamille ? datafamille.idfamille : ' ', Validators.required],
      dci: [data ? data.dci : ' ', Validators.required],
      forme: [data ? data.forme : ' ', Validators.required],
      categorie: [data ? data.categorie : ' ', Validators.required],
      dosage: [data ? data.dosage : ' ', Validators.required],
      pa: [data ? data.pa : ' ', Validators.required],
      pv: [data ? data.pv : ' ', Validators.required]
    });
  }

  // tslint:disable-next-line: typedef
  get f() { return this.form.controls; }

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
    dtoRequest = new ProduitRequestModel(
      this.f.id.value,
      this.f.idfamille.value,
      this.f.dci.value,
      this.f.forme.value,
      this.f.categorie.value,
      this.f.dosage.value,
      this.f.pa.value,
      this.f.pv.value
    );
    console.log(dtoRequest);
    this.produitService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Caisse enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
      });

    this.router.navigate(['/produits/liste']);


  }

}
