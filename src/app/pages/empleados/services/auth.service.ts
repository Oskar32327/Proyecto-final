import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { roleValidator } from 'src/app/auth/helpers/roleValidator';
import { EmpleadoService } from './empleados.service';
import { getFirestore, doc, setDoc, Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends roleValidator{

  public user$: Observable<any>;

  constructor(public afAuth:AngularFireAuth, private afs:AngularFirestore,private _empleadoService: EmpleadoService) {
    super();
    this.user$ = this.afAuth.authState.pipe(
        switchMap((user) => {
          if(user) {
            return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
          }
          return of(null);
        })
      );
   }

  async onLogin(email:string,password:string,rol:string):Promise<any>{
    const upperRol = rol.toUpperCase();
    try{
      const {user} = await this.afAuth.signInWithEmailAndPassword(email,password);
      this.updateUserData(user,upperRol);
      
      return user;
    }catch(error){
      console.log(error);
    }
  }

  async onRegister(email:string,password:string,rol:string){
    try {
      const infoUser = await this.afAuth.createUserWithEmailAndPassword(email,password).then((user)=>{
        return user;
      });
      console.log(infoUser);
    } catch (error) {
      console.log(error); 
    }
  }

  async logOut(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  
  private updateUserData(user:any,rol:string){
    const userRef : AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data:any = {
      uid: user.uid,
      email: user.email,
      role:rol
    };
    return userRef.set(data,{merge:true});
  }
}

