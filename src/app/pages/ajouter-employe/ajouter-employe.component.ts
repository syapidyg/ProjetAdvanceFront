import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { READ_ONE_EMPLOYE } from 'src/app/shared/_elements/api_constant';
import { EmployeEditerRequestModel } from 'src/app/shared/_models/requests/employe-editer-request.model';
import { EmployeRequestModel } from 'src/app/shared/_models/requests/employe-request.model';
import { EmployeResponseModel } from 'src/app/shared/_models/responses/employe-response.model';
import { EmployeService } from 'src/app/shared/_services/employe.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.scss']
})
export class AjouterEmployeComponent implements OnInit {

  public data: EmployeResponseModel[] = [];
  currentUser!: any;
  form!: FormGroup;
  employe!: any;
  isLoading!: boolean;
  submitted!: boolean;
  i !: number;
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  id!: any;
  public isDisabled = false;

  constructor(
    private employeService: EmployeService,
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
      this.editEmploye(this.id);
    }

    // this.selectCategorie();
    // this.selectForme();

  }

  // tslint:disable-next-line: typedef
  editEmploye(id: number) {
    this.isDisabled = true;
    this.employeService.get(`${READ_ONE_EMPLOYE}/${id}`)
      .then((response: any) => {
        console.log(response, response);
        this.initFormEdit(response.data);
      });
  }

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
  private initForm(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      nom: [data ? data.nom : ' ', Validators.required],
      prenom: [data ? data.prenom : ' ', Validators.required],
      birthday: [data ? data.birthday : ' ', Validators.required],
      email: [data ? data.email : ' ', Validators.required],
      number: [data ? data.number : ' ', Validators.required],
      username: [data ? data.username : ' ', Validators.required],
      password: [data ? data.password : ' ', Validators.required]
    });
  }
  // tslint:disable-next-line: typedef
  private initFormEdit(data: any) {
    const date = new Date(data ? data.birthday : null);
    this.form = this.fb.group({
      id: [data ? data.id : null],
      nom: [data ? data.nom : ' ', Validators.required],
      prenom: [data ? data.prenom : ' ', Validators.required],
      birthday: [data ? moment(date, 'YYYY-MM-DD') : ' ', Validators.required],
      email: [data ? data.email : ' ', Validators.required],
      number: [data ? data.number : ' ', Validators.required],
      username: [data ? data.username : null],
      password: [data ? data.password : null]
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

    if (this.f.username == null || this.f.password == null) {
      dtoRequest = new EmployeEditerRequestModel(
        this.f.id.value,
        this.f.nom.value,
        this.f.prenom.value,
        this.f.birthday.value,
        this.f.email.value,
        this.f.number.value
      );
    }
    dtoRequest = new EmployeRequestModel(
      this.f.id.value,
      this.f.nom.value,
      this.f.prenom.value,
      this.f.birthday.value,
      this.f.email.value,
      this.f.number.value,
      this.f.username.value,
      this.f.password.value
    );
    console.log(dtoRequest);
    this.employeService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Employe enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
        this.router.navigate(['/employes/ajouter']);
      });

    this.router.navigate(['/employes/liste']);


   }

 }


