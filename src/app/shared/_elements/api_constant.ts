import { environment } from 'src/environments/environment';

export const SERVEUR = `${environment.apiUrl}`;

// API du controlleur de caisse
export const CAISSE = SERVEUR + `/caisse`;
export const ADD_CAISSE = CAISSE + `/create`;
export const READ_CAISSE = CAISSE + `/read`;
export const READ_ONE_CAISSE = CAISSE + `/readOne`;
export const DELETE_CAISSE = CAISSE + `/delete`;

// API d'authentification
export const AUTH = SERVEUR + `/utilisateur/login`;
export const SIGNOUT = SERVEUR + `/utilisateur/signout`;

// API du controlleur de caisse
export const PRODUIT = SERVEUR + `/produit`;
export const ADD_PRODUIT = PRODUIT + `/create`;
export const READ_PRODUIT = PRODUIT + `/read`;
export const READ_ONE_PRODUIT = PRODUIT + `/readOne`;
export const DELETE_PRODUIT = PRODUIT + `/delete`;

// API du controlleur de famille
export const FAMILLE = SERVEUR + `/famille`;
export const ADD_FAMILLE = FAMILLE + `/create`;
export const READ_FAMILLE = FAMILLE + `/read`;
export const READ_ONE_FAMILLE = FAMILLE + `/readOne`;
export const DELETE_FAMILLE = FAMILLE + `/delete`;

// API du controlleur de patient
export const PATIENT = SERVEUR + `/client`;
export const ADD_PATIENT = PATIENT + `/create`;
export const READ_PATIENT = PATIENT + `/read`;
export const READ_ONE_PATIENT = PATIENT + `/readOne`;
export const DELETE_PATIENT = PATIENT + `/delete`;

// API du controlleur de Fournisseur
export const FOURNISSEUR = SERVEUR + `/fournisseur`;
export const ADD_FOURNISSEUR = FOURNISSEUR + `/create`;
export const READ_FOURNISSEUR = FOURNISSEUR + `/read`;
export const READ_ONE_FOURNISSEUR = FOURNISSEUR + `/readOne`;
export const DELETE_FOURNISSEUR = FOURNISSEUR + `/delete`;

// API du controlleur de l'employé
export const EMPLOYE = SERVEUR + `/employe`;
export const ADD_EMPLOYE = EMPLOYE + `/create`;
export const READ_EMPLOYE = EMPLOYE + `/read`;
export const READ_ONE_EMPLOYE = EMPLOYE + `/readOne`;
export const DELETE_EMPLOYE = EMPLOYE + `/delete`;

// API du controlleur de la commande
export const COMMANDE = SERVEUR + `/commande`;
export const ADD_COMMANDE = COMMANDE + `/create`;
export const READ_COMMANDE = COMMANDE + `/read`;
export const READ_COMMANDE_CLIENT = COMMANDE + `/readClient`;
export const READ_COMMANDE_FOURNISSEUR = COMMANDE + `/readFournisseur`;
export const READ_COMMANDE_STOCK = COMMANDE + `/readStock`;
export const READ_COMMANDE_TYPE = COMMANDE + `/readType`;
export const READ_ONE_COMMANDE = COMMANDE + `/readOne`;
export const DELETE_COMMANDE = COMMANDE + `/delete`;
export const TRANSFORM_COMMANDE = COMMANDE + `/transform`;
export const LIGNE_COMMANDE = SERVEUR + `/ligneDeCommande`;
export const READ_LIGNE_COMMANDE_CLIENT = LIGNE_COMMANDE + `/readClient`;
export const READ_LIGNE_COMMANDE_FOURNISSEUR = LIGNE_COMMANDE + `/readFournisseur`;
export const READ_LIGNE_COMMANDE_STOCK = LIGNE_COMMANDE + `/readStock`;


// API du controlleur de Fournisseur
export const DEPOT = SERVEUR + `/depot`;
export const ADD_DEPOT = DEPOT + `/create`;
export const READ_DEPOT = DEPOT + `/read`;
export const READ_ONE_DEPOT = DEPOT + `/readOne`;
export const DELETE_DEPOT = DEPOT + `/delete`;

// API du controlleur de Fournisseur
export const STOCK_ARTICLE = SERVEUR + `/stockArticle`;
export const ADD_STOCK_ARTICLE = STOCK_ARTICLE + `/create`;
export const READ_STOCK_ARTICLE = STOCK_ARTICLE + `/read`;
export const READ_ONE_STOCK_ARTICLE = STOCK_ARTICLE + `/readOne`;
export const DELETE_STOCK_ARTICLE = STOCK_ARTICLE + `/delete`;

// API du controlleur de Fournisseur
export const REGLEMENT = SERVEUR + `/reglement`;
export const ADD_REGLEMENT = REGLEMENT + `/create`;
export const READ_REGLEMENT = REGLEMENT + `/read`;
export const READ_REGLEMENT_CLIENT = REGLEMENT + `/read/readClient`;
export const READ_ONE_REGLEMENT = REGLEMENT + `/readOne`;
export const DELETE_REGLEMENT = REGLEMENT + `/delete`;
export const READ_REGLEMENT_FOURNISSEUR = REGLEMENT + `/read/readFournisseur`;

// API du controlleur de Fournisseur
export const ACTIVITE = SERVEUR + `/activite`;
export const LAST_ACTIVITE = ACTIVITE + `/lastConnexion`;
export const READ_ACTIVITE = ACTIVITE + `/read`;
