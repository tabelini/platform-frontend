import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {FuseConfigService} from '@fuse/services/config.service';
import {fuseAnimations} from '@fuse/animations';
import {UserService} from '../../../../../user.service';
import {User, AuthenticationStatus} from 'platform-domain';
import {Router} from '@angular/router';

@Component({
  selector: 'fuse-login-2',
  templateUrl: './login-2.component.html',
  styleUrls: ['./login-2.component.scss'],
  animations: fuseAnimations
})
export class FuseLogin2Component implements OnInit {
  loginForm: FormGroup;
  loginFormErrors: any;

  isLogging = false;
  loginError = undefined;

  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private us: UserService,
    private router: Router
  ) {
    this.fuseConfig.setConfig({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });

    this.us.user$.subscribe(user => {
      this.isLogging = false;
      console.log(`User subject: ${JSON.stringify(user)}`);
      if (user) {
        if (user.authenticationStatus === AuthenticationStatus.LOGGING) {
          this.isLogging = true;
        } else if (user.authenticationStatus === AuthenticationStatus.LOGGED) {
          console.log('navigating to the analytics');
          this.router.navigateByUrl('/apps/dashboards/analytics');
        } else if (user.authenticationStatus === AuthenticationStatus.WRONG_PASSWORD) {
          this.loginError = 'Usuário ou senha incorretos!';
        } else if (user.authenticationStatus === AuthenticationStatus.UNKNOWN_ERROR) {
          this.loginError = 'Erro desconhecido ao logar!';
        }
      }
    });
  }

  onLoginFormValuesChanged() {
    this.loginError = undefined;
    for (const field in this.loginFormErrors) {
      if (!this.loginFormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  tryLogin() {
    console.log(this.us);
    this.us.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }
}
