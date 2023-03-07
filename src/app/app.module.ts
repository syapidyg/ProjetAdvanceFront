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

import { authInterceptorProviders } from './shared/_helpers/auth.interceptor';
import { UserGuardService } from './shared/_helpers/user-guard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AjouterProduitComponent } from './pages/ajouter-produit/ajouter-produit.component';
import { FamilleComponent } from './pages/famille/famille.component';
import { ListerProduitComponent } from './pages/lister-produit/lister-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    CaisseComponent,
    RegisterComponent,
    LoginComponent,
    AjouterProduitComponent,
    FamilleComponent,
    ListerProduitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    Select2Module,
    ToastrModule.forRoot()
  ],
  providers: [
    UserGuardService,
    authInterceptorProviders,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
