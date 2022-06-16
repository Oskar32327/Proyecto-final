import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { EmpleadoFormModule } from './shared/components/empleado-form/empleado-form.module';
import {AngularFireModule} from '@angular/fire/compat';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages/empleados/edit/edit.component';
import { NewComponent } from './pages/empleados/new/new.component';
import { ListComponent } from './pages/empleados/list/list.component';
import { InfoComponent } from './pages/empleados/info/info.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './pages/empleados/services/auth.service';
import { canEditGuard } from './auth/can-edit.guard';
import { canAdminGuard } from './auth/can-admin.guard';
import { canEmpleadoGuard } from './auth/can-Empleado.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EditComponent,
    NewComponent,
    ListComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    EmpleadoFormModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [AngularFirestore,AuthService, canEditGuard, canAdminGuard,canEmpleadoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
