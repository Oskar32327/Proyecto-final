import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/pages/empleados/services/empleados.service';

interface roles{
  role:string;
}

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar Empleado';


  constructor(private fb: FormBuilder,private _empleadoService: EmpleadoService,private router: Router,private aRoute: ActivatedRoute){

    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      descripcion: ['', Validators.required],
      salario: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarEmpleado() {
    this.submitted = true;

    if (this.createEmpleado.invalid) {
      return;
    }
    if (this.id === null) {
      this.agregarEmpleado();
    } else {
      this.editarEmpleado(this.id);
    }

  }

  agregarEmpleado() {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      email: this.createEmpleado.value.email,
      descripcion: this.createEmpleado.value.descripcion,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;
    this._empleadoService.agregarEmpleado(empleado).then(()=>{
      console.log('Empleado registrado con exito');
      this.router.navigate(['list']);
    }).catch(()=>{
      console.log('error');
    })
  }

  editarEmpleado(id: string) {
    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      email: this.createEmpleado.value.email,
      descripcion: this.createEmpleado.value.descripcion,
      salario: this.createEmpleado.value.salario,      
      fechaActualizacion: new Date()
    }

    this.loading = true;

    this._empleadoService.actualizarEmpleado(id, empleado).then(() => {
      this.loading = false;
      console.log('Empleado modificado con exito');
      this.router.navigate(['list']);
    }).catch(()=>{
      console.log('error');
    })
  }

  esEditar() {
    this.titulo = 'Editar Empleado'
    if (this.id !== null) {
      this.loading = true;
      this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.loading = false;
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          email: data.payload.data()['email'],
          descripcion: data.payload.data()['descripcion'],
          salario: data.payload.data()['salario'],
        })
      })
    }
  }
  irLista(){
    this.router.navigate(['list']);
  }

}


function esEditar(): any {
  throw new Error('Function not implemented.');
}
