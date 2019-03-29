import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  public loginFrom: FormGroup;
  public errors = [];

  constructor(private router: Router,
              private auth: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initLoginFrom();
  }

  public onSubmit(){
    if (this.loginFrom.invalid) {
      return;
    }

    this.errors = [];

    let email = this.loginFrom.value.email;
    let password = this.loginFrom.value.password;

    this.login(email, password);
  }

  async login(email, password) {
    let result = await this.auth.login(email, password);

    result.success
      ? this.navigate('/conversations')
      : this.errors.push(result.error);
  }

  private initLoginFrom(){
    this.loginFrom = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  private navigate(url) {
    this.router.navigate([url]);
  }

}
