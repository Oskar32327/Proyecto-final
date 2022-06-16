import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/empleados/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public isLogged= false;
  public user$: Observable<any> = this.authSvc.afAuth.user;
  
  constructor(private authSvc:AuthService,private router: Router) { }

  async logOut(){
    try {
      await this.authSvc.logOut();
      this.router.navigate(['list']);
    } catch (error) {
      console.log(error);   
    }    
  }

}
