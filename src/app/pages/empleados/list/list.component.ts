import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from '../services/empleados.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  empleados: any[] = [];
  constructor(private router:Router, private _empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }
  getEmpleados() {
    this._empleadoService.getEmpleados().subscribe(data => {
      this.empleados = [];
      data.forEach((element: any) => {
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.empleados);
    });
  }

  eliminarEmpleado(id: string) {
    this._empleadoService.eliminarEmpleado(id).then(() => {
      console.log('empelado eliminado con exito');
    }).catch(error => {
      console.log(error);
    });
  }

}
