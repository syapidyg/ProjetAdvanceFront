import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ADD_DEPOT, DELETE_DEPOT, READ_DEPOT, READ_ONE_DEPOT } from 'src/app/shared/_elements/api_constant';
import { DepotRequestModel } from 'src/app/shared/_models/requests/depot-request.model';
import { DepotResponseModel } from 'src/app/shared/_models/responses/depot-response.model';
import { DepotService } from 'src/app/shared/_services/depot.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {

  public data: DepotResponseModel[] = [];
  currentUser!: any;
  form!: FormGroup;
  formpage!: FormGroup;
  depot!: any;
  isLoading!: boolean;
  submitted!: boolean;
  i !: number;
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  public isDisabled = false;
  collectionSize = this.data.length;


  constructor(
    private depotService: DepotService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
    private tokenStorage: TokenStorageService

  ) { }


  ngOnInit(): void {
    this.getDepot();
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
  getDepot() {
    this.depotService.get(READ_DEPOT).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }


  // tslint:disable-next-line: typedef
  readOneDepot(depot: DepotResponseModel) {
    this.depotService.get(READ_ONE_DEPOT + '/' + depot.id).then((response: any) => {
      console.log(response);
      this.isDisabled = true;
      this.initFormLogin(depot);
    });
  }

  // tslint:disable-next-line: typedef
  deleteDepot(depot: DepotResponseModel) {
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
        this.depotService.delete(DELETE_DEPOT + '/' + depot.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getDepot();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getDepot();
      }
    });
  }

  // tslint:disable-next-line: typedef
  editDepot(depot: any) {
    this.isDisabled = false;
    this.initFormLogin(depot);
  }

  // tslint:disable-next-line: typedef
  private initFormLogin(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      nom: [data ? data.name : ' ', Validators.required],
      description: [data ? data.description : ' ', Validators.required]
    });
  }
  private initFormPage(data: any) {
    this.formpage = this.fb.group({
      5: [data ? data.id : null],
      10: [data ? data.name : ' ', Validators.required],
      25: [data ? data.description : ' ', Validators.required]
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
    dtoRequest = new DepotRequestModel(this.f.id.value, this.f.nom.value, this.f.description.value);
    console.log(dtoRequest);
    this.depotService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Depot enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
      });

  }


}
