import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalTestComponent } from 'src/app/modal/modal-test/modal-test.component';
import { DELETE_PATIENT, READ_ONE_PATIENT, READ_PATIENT } from 'src/app/shared/_elements/api_constant';
import { PatientRequestModel } from 'src/app/shared/_models/requests/patient-request.model';
import { PatientResponseModel } from 'src/app/shared/_models/responses/patient-response.model';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { PatientService } from 'src/app/shared/_services/patient-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-patient',
  templateUrl: './ajouter-patient.component.html',
  styleUrls: ['./ajouter-patient.component.scss']
})
export class AjouterPatientComponent implements OnInit {

  public data: PatientResponseModel[] = [];
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
  collectionSize = this.data.length;

  constructor(
    private patientService: PatientService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notif: NotificationService,
    public dialog: MatDialog

  ) { }
  ngOnInit(): void {
    this.getPatient();
    this.initForm(null);
  }

  openDialog() {
    this.dialog.open(ModalTestComponent);
  }

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
  readOnePatient(patient: PatientResponseModel) {
    this.patientService.get(READ_ONE_PATIENT + '/' + patient.id).then((response: any) => {
      console.log(response);
      this.isDisabled = true;
      this.initForm(patient);
    });
  }

  // tslint:disable-next-line: typedef
  deletePatient(patient: PatientResponseModel) {
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
        this.patientService.delete(DELETE_PATIENT + '/' + patient.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getPatient();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getPatient();
      }
    });
  }

  // tslint:disable-next-line: typedef
  getPatient() {
    this.patientService.get(READ_PATIENT).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  editPatient(patient: any) {
    this.isDisabled = false;
    this.initForm(patient);
  }

  get f() { return this.form.controls; }

  // tslint:disable-next-line: typedef
  private initForm(data: any) {
    this.form = this.fb.group({
      id: [data ? data.id : null],
      name: [data ? data.name : '', Validators.required],
      number: [data ? data.number : '', Validators.required],
      email: [data ? data.email : '', [Validators.required, Validators.email]],
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
    dtoRequest = new PatientRequestModel(
      this.f.id.value,
      this.f.name.value,
      this.f.number.value,
      this.f.email.value,
    );
    console.log(dtoRequest);
    this.patientService.post(dtoRequest).toPromise()
      .then((result: any) => {
        console.log('result', result);
        this.isLoading = !this.isLoading;
        this.notif.success('Patient enregistré avec succès ');
        window.location.reload();
      }, err => {
        console.log(err);
        this.notif.danger('Echec lors de l\'enregistrement ');
        this.isLoading = !this.isLoading;
      });

    this.router.navigate(['/patients/ajouter']);


  }

}
