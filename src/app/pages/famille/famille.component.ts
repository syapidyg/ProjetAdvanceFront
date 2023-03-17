import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ADD_FAMILLE, DELETE_FAMILLE, READ_FAMILLE, READ_ONE_FAMILLE } from 'src/app/shared/_elements/api_constant';
import { FamilleRequestModel } from 'src/app/shared/_models/requests/famille-request.model';
import { FamilleResponseModel } from 'src/app/shared/_models/responses/famille-reponse.model';
import { FamilleService } from 'src/app/shared/_services/famille-service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {

  public data: FamilleResponseModel[] = [];
  currentUser!: any;
  form!: FormGroup;
  formpage!: FormGroup;
  famille!: any;
  isLoading!: boolean;
  submitted!: boolean;
  i !: number;
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  public isDisabled = false;
  collectionSize = this.data.length;


  constructor(
    private familleService: FamilleService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getFamille();
    this.initFormLogin(null);
  }


  onPageChange(pageNumber: number) {
    this.p = pageNumber;
  }

  onPageSizeChange() {
    this.collectionSize = this.data.length;
    this.p = 1;
  }

  // tslint:disable-next-line: typedef
  getFamille() {
    this.familleService.get(READ_FAMILLE).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }


  // tslint:disable-next-line: typedef
  readOneFamille(famille: FamilleResponseModel) {
    this.familleService.get(READ_ONE_FAMILLE + '/' + famille.id).then((response: any) => {
      console.log(response);
      this.isDisabled = true;
      this.initFormLogin(famille);
    });
  }

  // tslint:disable-next-line: typedef
  deleteFamille(famille: FamilleResponseModel) {
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
        this.familleService.delete(DELETE_FAMILLE + '/' + famille.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getFamille();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getFamille();
      }
    });
  }

  // tslint:disable-next-line: typedef
  editFamille(famille: any) {
    this.isDisabled = false;
    this.initFormLogin(famille);
  }

  // tslint:disable-next-line: typedef
  private initFormLogin(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      name: [data ? data.name : ' ', Validators.required],
      rayon: [data ? data.rayon : ' ', Validators.required],
      description: [data ? data.description : ' ', Validators.required]
    });
  }
  private initFormPage(data: any) {
    this.formpage = this.fb.group({
      5: [data ? data.id : null],
      10: [data ? data.name : ' ', Validators.required],
      25: [data ? data.rayon : ' ', Validators.required]
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
    dtoRequest = new FamilleRequestModel(this.f.id.value, this.f.name.value, this.f.rayon.value, this.f.description.value);
    console.log(dtoRequest);
    this.familleService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Famille enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
      });

  }


}
