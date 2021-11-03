import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './layouts/account/account.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { FlowEditComponent } from './pages/flow-edit/flow-edit.component';
import { FlowListComponent } from './pages/flow-list/flow-list.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'flowedit', component: FlowEditComponent
      },
      {
        path: '', component: FlowListComponent
      }
      
    ]
  },
  {
    path: 'login',
    component: AccountComponent,
    children: [
      {
        path: '', component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
