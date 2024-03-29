import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { ActiviteUtilisateurComponent } from './pages/activite-utilisateur/activite-utilisateur.component';
import { AjouterCommandeFournisseurComponent } from './pages/ajouter-commande-fournisseur/ajouter-commande-fournisseur.component';
import { AjouterCommandeComponent } from './pages/ajouter-commande/ajouter-commande.component';
import { AjouterEmployeComponent } from './pages/ajouter-employe/ajouter-employe.component';
import { AjouterFournisseurComponent } from './pages/ajouter-fournisseur/ajouter-fournisseur.component';
import { AjouterPatientComponent } from './pages/ajouter-patient/ajouter-patient.component';
import { AjouterProduitComponent } from './pages/ajouter-produit/ajouter-produit.component';
import { AjouterStockArticleComponent } from './pages/ajouter-stock-article/ajouter-stock-article.component';
import { CaisseComponent } from './pages/caisse/caisse.component';
import { DepotComponent } from './pages/depot/depot.component';
import { FamilleComponent } from './pages/famille/famille.component';
import { InformationUtilisateurComponent } from './pages/information-utilisateur/information-utilisateur.component';
import { ListerCommandeClientComponent } from './pages/lister-commande-client/lister-commande-client.component';
import { ListerCommandeFournisseurComponent } from './pages/lister-commande-fournisseur/lister-commande-fournisseur.component';
import { ListerEmployeComponent } from './pages/lister-employe/lister-employe.component';
import { ListerFournisseurComponent } from './pages/lister-fournisseur/lister-fournisseur.component';
import { ListerMouvementStockComponent } from './pages/lister-mouvement-stock/lister-mouvement-stock.component';
import { ListerProduitComponent } from './pages/lister-produit/lister-produit.component';
import { ListerReglementClientComponent } from './pages/lister-reglement-client/lister-reglement-client.component';
import { ListerReglementFournisseurComponent } from './pages/lister-reglement-fournisseur/lister-reglement-fournisseur.component';
import { ListerStockArticleComponent } from './pages/lister-stock-article/lister-stock-article.component';
import { TransfertStockArticleComponent } from './pages/transfert-stock-article/transfert-stock-article.component';
import { UtilisateurProfileComponent } from './pages/utilisateur-profile/utilisateur-profile.component';
import { LoginComponent } from './session/login/login.component';
import { UserGuardService } from './shared/_helpers/user-guard.service';

const routes: Routes = [
  
  { path: 'session/login', component: LoginComponent },
  {
    path: '', component: MainComponent, canActivate: [UserGuardService],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'caisses', component: CaisseComponent },
      { path: 'familles', component: FamilleComponent },
      { path: 'depots', component: DepotComponent },
      { path: 'produits/ajouter', component: AjouterProduitComponent },
      { path: 'produits/ajouter/:id', component: AjouterProduitComponent },
      { path: 'produits/liste', component: ListerProduitComponent },
      { path: 'patients/ajouter', component: AjouterPatientComponent },
      { path: 'fournisseurs/ajouter', component: AjouterFournisseurComponent },
      { path: 'fournisseurs/liste', component: ListerFournisseurComponent },
      { path: 'fournisseurs/ajouter/:id', component: AjouterFournisseurComponent },
      { path: 'fournisseurs/ajouter/:id/:type', component: AjouterFournisseurComponent },
      { path: 'employes/ajouter', component: AjouterEmployeComponent },
      { path: 'employes/liste', component: ListerEmployeComponent },
      { path: 'employes/ajouter/:id', component: AjouterEmployeComponent },
      { path: 'ventes/commande/ajouter', component: AjouterCommandeComponent },
      { path: 'ventes/commande/ajouter/:id', component: AjouterCommandeComponent },
      { path: 'ventes/commande/liste', component: ListerCommandeClientComponent },
      { path: 'ventes/commande/reglement', component: ListerReglementClientComponent },
      { path: 'achats/commande/ajouter', component: AjouterCommandeFournisseurComponent },
      { path: 'achats/commande/ajouter/:id', component: AjouterCommandeFournisseurComponent },
      { path: 'achats/commande/liste', component: ListerCommandeFournisseurComponent },
      { path: 'achats/commande/reglement', component: ListerReglementFournisseurComponent },
      { path: 'stocks/ajouter', component: AjouterStockArticleComponent },
      { path: 'stocks/transfert', component: TransfertStockArticleComponent },
      { path: 'stocks/liste', component: ListerStockArticleComponent },
      { path: 'stocks/mouvement', component: ListerMouvementStockComponent },
      { path: 'stocks/ajouter/:id', component: AjouterEmployeComponent },
      {
        path: 'utilisateur', component: UtilisateurProfileComponent,
        children: [
          { path: 'utilisateur/profile/activite', component: ActiviteUtilisateurComponent },
          { path: 'utilisateur/profile/information', component: InformationUtilisateurComponent },
        ]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
