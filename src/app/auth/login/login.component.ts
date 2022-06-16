import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/empleados/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    role:new FormControl('')
  });
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  async onLogin(){
    const {email,password,role} = this.loginForm.value;
    console.log(email);
    console.log(password);
    console.log(role);
    
    try {
      await this.authSvc.onLogin(email,password,role);
        this.router.navigate(['list']);
    } catch (error) {
      console.log(error);
    }
  }
  
}