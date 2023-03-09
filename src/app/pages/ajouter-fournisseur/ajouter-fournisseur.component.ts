import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { READ_ONE_FOURNISSEUR } from 'src/app/shared/_elements/api_constant';
import { FournisseurRequestModel } from 'src/app/shared/_models/requests/fournisseur-request.model';
import { FournisseurResponseModel } from 'src/app/shared/_models/responses/fournisseur-response.model';
import { FournisseurService } from 'src/app/shared/_services/fournisseur.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';

@Component({
  selector: 'app-ajouter-fournisseur',
  templateUrl: './ajouter-fournisseur.component.html',
  styleUrls: ['./ajouter-fournisseur.component.scss']
})
export class AjouterFournisseurComponent implements OnInit {

  public data: FournisseurResponseModel[] = [];
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

  constructor(
    private fournisseurService: FournisseurService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService,

  ) { }

  ngOnInit(): void {
    this.initForm(null);
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    if (this.id) {
      this.editFournisseur(this.id);
    }
  }

  // tslint:disable-next-line: typedef
  editFournisseur(id: number) {
    this.fournisseurService.get(`${READ_ONE_FOURNISSEUR}/${id}`)
      .then((response: any) => {
        console.log(response, response);
        this.initForm(response.data);
      });
  }


  // tslint:disable-next-line: typedef
  private initForm(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      name: [data ? data.name : ' ', Validators.required],
      number: [data ? data.number : ' ', Validators.required],
      email: [data ? data.email : ' ', Validators.required],
      adress: [data ? data.address : ' ', Validators.required],
      city: [data ? data.city : ' ', Validators.required],
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
    dtoRequest = new FournisseurRequestModel(
      this.f.id.value,
      this.f.name.value,
      this.f.number.value,
      this.f.email.value,
      this.f.adress.value,
      this.f.city.value,
    );
    console.log(dtoRequest);
    this.fournisseurService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Produit enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
        this.router.navigate(['/fournisseurs/ajouter']);
      });

    this.router.navigate(['/fournisseurs/liste']);


  }

}
