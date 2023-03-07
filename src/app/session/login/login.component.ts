import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/_services/auth.service';
import { TokenStorageService } from 'src/app/shared/_services/token-storage.service';
import { NotificationService } from 'src/app/shared/_services/notifiaction.service';
import { UserRequestModel } from 'src/app/shared/_models/requests/user-request.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public isLoggedIn = false;
  public isLoginFailed = false;
  public form!: FormGroup;
  public submitted!: boolean;
  public isLoading!: boolean;
  currentUser: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private notif: NotificationService
  ) { }
  
  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser();
    const currentToken = this.tokenStorage.getToken();
    if (this.currentUser || currentToken) {
      this.isLoggedIn = true;
      this.router.navigate(['/']).then(() => { });
    } else {
      this.initFormLogin();
    }
  }

  get f() { return this.form.controls; }

  private initFormLogin() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }


  login() {
    this.submitted = true;
    this.isLoading = true;
    if (this.form.invalid) {
      this.isLoading = !this.isLoading;
      return;
    }
    let dto;
    dto = new UserRequestModel(this.f.username.value, this.f.password.value);
    console.log(dto);
    this.authService.login(dto)
      .subscribe((result: any)  => {
        console.log('result', result)
        this.tokenStorage.saveToken(result.data.token);
        this.tokenStorage.saveUser(result.data.utilisateur);
        this.isLoading = !this.isLoading;
        this.notif.success('Connexion avec sucsess ')
        if (this.tokenStorage.getUser() || this.tokenStorage.getToken()) {
          this.router.navigate(['/']);
        }
      }, err => {
        console.log(err)
        this.notif.danger('Echec lors de la connexion ');
        this.isLoading = !this.isLoading;
        this.isLoginFailed = true;
      })

  }
}