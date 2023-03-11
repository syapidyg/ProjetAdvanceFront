import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_EMPLOYE, READ_EMPLOYE, READ_ONE_EMPLOYE } from 'src/app/shared/_elements/api_constant';
import { EmployeResponseModel } from 'src/app/shared/_models/responses/employe-response.model';
import { EmployeService } from 'src/app/shared/_services/employe.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lister-employe',
  templateUrl: './lister-employe.component.html',
  styleUrls: ['./lister-employe.component.scss']
})
export class ListerEmployeComponent implements OnInit {

  public data: EmployeResponseModel[] = [];
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: EmployeResponseModel;

  constructor(
    private employeService: EmployeService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
  ) { }

  ngOnInit(): void {

    this.getEmploye();

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
  getEmploye() {
    this.employeService.get(READ_EMPLOYE).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  readOneEmploye(employe: any) {
    this.employeService.get(READ_ONE_EMPLOYE + '/' + employe.id).then((response: any) => {
      this.dataRead = response.data;
      console.log(response);
    });

  }

  // tslint:disable-next-line: typedef
  deleteEmploye(employe: EmployeResponseModel) {
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
        this.employeService.delete(DELETE_EMPLOYE + '/' + employe.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getEmploye();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getEmploye();
      }
    });
  }

  // readOneEmploye(employe: any) {
  //   this.employeService.get(READ_ONE_EMPLOYE + '/' + employe.id).then((response: any) => {
  //     console.log(response);
  //     this.isDisabled = true;
  //     this.dataRead = response.data;
  //     console.log(this.dataRead);
  //   });
  // }

  // tslint:disable-next-line: typedef
  recupId(employe: EmployeResponseModel) {
    this.router.navigate(['/employes/ajouter/', employe.id]);
  }

}


