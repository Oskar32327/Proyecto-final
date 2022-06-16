import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadoFormComponent } from './empleado-form.component';



@NgModule({
  declarations: [EmpleadoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[EmpleadoFormComponent]
})
export class EmpleadoFormModule { }
