import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../services/empleados.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  id: string | null;
  nombre:string | undefined;
  apellido:string | undefined;
  email:string | undefined;
  descripcion:string | undefined;
  salario:string | undefined;

  constructor(private fb: FormBuilder,private _empleadoService: EmpleadoService,private router: Router,private aRoute: ActivatedRoute) {
    this.id = this.aRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getInfo();
  }


  getInfo() {
    if (this.id !== null) {
    this._empleadoService.getEmpleado(this.id).subscribe(data => {
        this.nombre = data.payload.data()['nombre'],
        this.apellido = data.payload.data()['apellido'],
        this.email = data.payload.data()['email'],
        this.descripcion = data.payload.data()['descripcion'],
        this.salario = data.payload.data()['salario']
      })
    }
  }
}
