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
