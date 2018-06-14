import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { OptionsComponent } from './options/options.component';
import { ExportComponent } from './export/export.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'options', component: OptionsComponent }
  { path: 'dashboard', component: DashboardComponent },
  { path: 'export', component: ExportComponent }
  { path: 'export/:page', component: ExportComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
