import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';

import {FuseLogin2Component} from './login-2.component';

const routes = [
  {
    path: 'auth/login-2',
    component: FuseLogin2Component
  }
];

@NgModule({
  declarations: [
    FuseLogin2Component
  ],
  imports: [
    RouterModule.forChild(routes),

    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FuseSharedModule
  ]
})
export class Login2Module {
}
