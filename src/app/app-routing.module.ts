import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { AjouterProduitComponent } from './pages/ajouter-produit/ajouter-produit.component';
import { CaisseComponent } from './pages/caisse/caisse.component';
import { ListerProduitComponent } from './pages/lister-produit/lister-produit.component';
import { LoginComponent } from './session/login/login.component';
import { UserGuardService } from './shared/_helpers/user-guard.service';

const routes: Routes = [
  { path: 'session/login', component: LoginComponent },
  {
    path: '', component: MainComponent, canActivate: [UserGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'caisses', component: CaisseComponent },
      { path: 'produits/ajouter', component: AjouterProduitComponent },
      { path: 'produits/ajouter/:id', component: AjouterProduitComponent },
      { path: 'produits/liste', component: ListerProduitComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
