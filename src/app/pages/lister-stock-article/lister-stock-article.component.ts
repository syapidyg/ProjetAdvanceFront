import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DELETE_STOCK_ARTICLE, READ_STOCK_ARTICLE, READ_ONE_STOCK_ARTICLE } from 'src/app/shared/_elements/api_constant';
import { StockArticleService } from 'src/app/shared/_services/stock-article.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import Swal from 'sweetalert2';
import { StockArticleResponseModel } from 'src/app/shared/_models/responses/stock-article-request.model';

@Component({
  selector: 'app-lister-stock-article',
  templateUrl: './lister-stock-article.component.html',
  styleUrls: ['./lister-stock-article.component.scss']
})

export class ListerStockArticleComponent implements OnInit {

  public data: StockArticleResponseModel[] = [];
  public isDisabled = false;
  currentUser!: any;
  form!: FormGroup;
  caisse!: any;
  // Pagination options
  p = 1; // Page courante
  pageSize = 5; // Nombre d'éléments par page
  collectionSize = this.data.length;
  public dataRead!: StockArticleResponseModel;


  constructor(
    private stockArticleService: StockArticleService,
    private fb: FormBuilder,
    private router: Router,
    private notif: NotificationService,
  ) { }

  ngOnInit(): void {

    this.getStockArticle();
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
  getStockArticle() {
    this.stockArticleService.get(READ_STOCK_ARTICLE).then((response: any) => {
      this.data = response.data;
      console.log(response);
    });
  }

  // tslint:disable-next-line: typedef
  readOneStockArticle(stockArticle: any) {
    this.stockArticleService.get(READ_ONE_STOCK_ARTICLE + '/' + stockArticle.id).then((response: any) => {
      this.dataRead = response.data;
      console.log(response);
    });

  }

  // tslint:disable-next-line: typedef
  deleteStockArticle(stockArticle: StockArticleResponseModel) {
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
        this.stockArticleService.delete(DELETE_STOCK_ARTICLE + '/' + stockArticle.id).then((response: any) => {
          this.data = response.data;
          console.log(response);
          Swal.fire({
            title: 'Supprimé!',
            text: 'L\'élément a été supprimé avec succès.',
            icon: 'success',
            confirmButtonColor: '#28a745'
          });
          this.getStockArticle();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Une erreur est survenue lors de la suppression de l\'élément.',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK'
        });
        this.getStockArticle();
      }
    });
  }

  // readOneStockArticle(stockArticle: any) {
  //   this.stockArticleService.get(READ_ONE_STOCK_ARTICLE + '/' + stockArticle.id).then((response: any) => {
  //     console.log(response);
  //     this.isDisabled = true;
  //     this.dataRead = response.data;
  //     console.log(this.dataRead);
  //   });
  // }

  // tslint:disable-next-line: typedef
  recupId(stockArticle: StockArticleResponseModel) {
    this.router.navigate(['/stockArticles/ajouter/', stockArticle.id]);
  }

}

