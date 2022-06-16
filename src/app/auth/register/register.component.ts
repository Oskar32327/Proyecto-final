import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/empleados/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
  }


  async onRegister(){
    const {email,password,rol} = this.registerForm.value;
    try {
      const user = await this.authSvc.onRegister(email,password,rol);
        this.router.navigate(['list']);
    } catch (error) {
      console.log(error);
    }
  }
}
