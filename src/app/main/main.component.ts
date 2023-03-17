import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { CaisseService } from '../shared/_services/caisse-service';
import { NotificationService } from '../shared/_services/notifiaction.service';
import { TokenStorageService } from '../shared/_services/token-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  currentUser!: any;
  currentToken!: any;

  constructor(
    private tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {

      this.getUser();
    
  }

  getUser() {
    this.currentUser = this.tokenStorage.getUser();
    console.log(this.currentUser);
  }

  signOut() {
    this.currentToken = this.tokenStorage.getToken;
    if (this.currentToken != null) {
      this.tokenStorage.signOut();
    }
  };



  
}
