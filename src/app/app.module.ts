import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { CaisseComponent } from './pages/caisse/caisse.component';
import { RegisterComponent } from './session/register/register.component';
import { LoginComponent } from './session/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { Select2Module } from 'ng-select2-component';
import { MatDialogModule } from '@angular/material/dialog';
import { authInterceptorProviders } from './shared/_helpers/auth.interceptor';
import { UserGuardService } from './shared/_helpers/user-guard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AjouterProduitComponent } from './pages/ajouter-produit/ajouter-produit.component';
import { FamilleComponent } from './pages/famille/famille.component';
import { ListerProduitComponent } from './pages/lister-produit/lister-produit.component';
import { AjouterPatientComponent } from './pages/ajouter-patient/ajouter-patient.component';
import { ModalTestComponent } from './modal/modal-test/modal-test.component';
import { AjouterFournisseurComponent } from './pages/ajouter-fournisseur/ajouter-fournisseur.component';
import { ListerFournisseurComponent } from './pages/lister-fournisseur/lister-fournisseur.component';
import { ListerEmployeComponent } from './pages/lister-employe/lister-employe.component';
import { AjouterEmployeComponent } from './pages/ajouter-employe/ajouter-employe.component';
import { AjouterCommandeComponent } from './pages/ajouter-commande/ajouter-commande.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DepotComponent } from './pages/depot/depot.component';
import { ListerCommandeClientComponent } from './pages/lister-commande-client/lister-commande-client.component';
import { ListerReglementClientComponent } from './pages/lister-reglement-client/lister-reglement-client.component';
import { AjouterCommandeFournisseurComponent } from './pages/ajouter-commande-fournisseur/ajouter-commande-fournisseur.component';
import { ListerCommandeFournisseurComponent } from './pages/lister-commande-fournisseur/lister-commande-fournisseur.component';
import { ListerReglementFournisseurComponent } from './pages/lister-reglement-fournisseur/lister-reglement-fournisseur.component';
import { ListerStockArticleComponent } from './pages/lister-stock-article/lister-stock-article.component';
import { AjouterStockArticleComponent } from './pages/ajouter-stock-article/ajouter-stock-article.component';
import { TransfertStockArticleComponent } from './pages/transfert-stock-article/transfert-stock-article.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    CaisseComponent,
    RegisterComponent,
    LoginComponent,
    AjouterProduitComponent,
    AjouterFournisseurComponent,
    FamilleComponent,
    ListerProduitComponent,
    AjouterPatientComponent,
    ModalTestComponent,
    ListerFournisseurComponent,
    ListerEmployeComponent,
    AjouterEmployeComponent,
    AjouterCommandeComponent,
    DepotComponent,
    ListerCommandeClientComponent,
    ListerReglementClientComponent,
    AjouterCommandeFournisseurComponent,
    ListerCommandeFournisseurComponent,
    ListerReglementFournisseurComponent,
    ListerStockArticleComponent,
    AjouterStockArticleComponent,
    TransfertStockArticleComponent
  ],
  imports: [
    BrowserModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    MatDialogModule,
    Select2Module,
    ToastrModule.forRoot(),
    NgbModule,
    NgbTypeaheadModule

  ],
  providers: [
    UserGuardService,
    authInterceptorProviders,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
