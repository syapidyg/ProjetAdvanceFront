import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { CaisseRequestModel } from "../_models/requests/caisse-request.model";
import { Observable } from "rxjs";
import { ADD_CAISSE } from "../_elements/api_constant";
