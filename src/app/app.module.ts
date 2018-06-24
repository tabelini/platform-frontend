import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {TranslateModule} from '@ngx-translate/core';
import 'hammerjs';

import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';

import {fuseConfig} from './fuse-config';

import {AppComponent} from './app.component';
import {FuseFakeDbService} from './fuse-fake-db/fuse-fake-db.service';
import {FuseMainModule} from './main/main.module';
import {AppStoreModule} from './store/store.module';
import {RoleGuard} from './role.guard';
import {UserService} from './user.service';
import { EndPointListComponent } from './end-point-list/end-point-list.component';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from '@angular/material';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {EndPointService} from './end-point.service';
import {TokenInterceptor} from './token.interceptor';
import { EndPointEditComponent } from './end-point-edit/end-point-edit.component';

const appRoutes: Routes = [
  {
    path: 'apps',
    loadChildren: './main/content/apps/apps.module#FuseAppsModule',
    canActivate: [RoleGuard],
    data: {roles: ['ROLE_ROOT', 'ROLE_USER', 'ROLE_ADMIN']}
  },
  {
    path: 'pages',
    loadChildren: './main/content/pages/pages.module#FusePagesModule'
  },
  {
    path: 'ui',
    loadChildren: './main/content/ui/ui.module#FuseUIModule'
  },
  {
    path: 'services',
    loadChildren: './main/content/services/services.module#FuseServicesModule'
  },
  {
    path: 'components',
    loadChildren: './main/content/components/components.module#FuseComponentsModule'
  },
  {
    path: 'components-third-party',
    loadChildren: './main/content/components-third-party/components-third-party.module#FuseComponentsThirdPartyModule'
  },
  {
    path: 'endpoints',
    component: EndPointListComponent,
    canActivate: [RoleGuard],
    data: {roles: ['ROLE_ROOT', 'ROLE_USER', 'ROLE_ADMIN']}
  },
  {
    path: 'endpoints/:id',
    component: EndPointEditComponent,
    canActivate: [RoleGuard],
    data: {roles: ['ROLE_ROOT', 'ROLE_USER', 'ROLE_ADMIN']}
  },
  {
    path: '**',
    redirectTo: 'apps/dashboards/analytics'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EndPointListComponent,
    EndPointEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot(),
    InMemoryWebApiModule.forRoot(FuseFakeDbService, {
      delay: 0,
      passThruUnknownUrl: true
    }),
    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    AppStoreModule,
    FuseMainModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxDatatableModule,
  ],
  providers: [RoleGuard, UserService, EndPointService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
