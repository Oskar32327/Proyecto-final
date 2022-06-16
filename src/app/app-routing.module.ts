import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canAdminGuard } from './auth/can-admin.guard';
import { canEditGuard } from './auth/can-edit.guard';
import { canEmpleadoGuard } from './auth/can-Empleado.guard';
import { EditComponent } from './pages/empleados/edit/edit.component';
import { InfoComponent } from './pages/empleados/info/info.component';
import { ListComponent } from './pages/empleados/list/list.component';
import { NewComponent } from './pages/empleados/new/new.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch:'full'},
  { path: 'list', component : ListComponent },
 { path: 'new', component : NewComponent,canActivate:[canAdminGuard] },
 { path: 'info/:id', component : InfoComponent,canActivate:[] },
   { path: 'edit/:id', component : EditComponent,canActivate:[canEditGuard] },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
   { path: '**', redirectTo: 'list', pathMatch:'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
