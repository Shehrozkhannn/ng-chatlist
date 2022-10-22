import { Injectable } from '@angular/core'; 
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider , GithubAuthProvider ,FacebookAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // email : string = '';

  constructor(private fireauth : AngularFireAuth , private router : Router , private fireService : AngularFirestore, private toastr: ToastrService ) { }

  login(loginForm:any){
    // console.log(loginForm.email);
    this.fireauth.signInWithEmailAndPassword(loginForm.email , loginForm.password).then( (res:any) =>{
      this.toastr.success('Login Successfully');
      localStorage.setItem('token', 'true');
      localStorage.setItem('id' , res.user?.multiFactor.user.uid);
      this.router.navigate(['/chatbox']);
    }, err => {   
      this.toastr.error(err?.message ? err?.message : err);
      this.router.navigate(['/login'])
    })
    }
  register(loginForm:any){
    this.fireauth.createUserWithEmailAndPassword(loginForm.email , loginForm.password).then( res =>{
      this.toastr.success('Registred Successfully');
      this.router.navigate(['/login']);
    }, err => {
      this.toastr.error(err?.message ? err?.message : err);
      this.router.navigate(['/register']);
    })
  }
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      this.toastr.error(err?.message ? err?.message : err)
    })
  }

  forgotPassword(loginForm : any){
      this.fireauth.sendPasswordResetEmail(loginForm.email).then(()=>{
        console.log(loginForm.email);
        // this.router.navigate(['/verify-email'])
      }, err => {
        alert('Something went wrong');
      })
  }
  signInWithGoogle(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res => {
      this.router.navigate(['/chatbox']);
      localStorage.setItem('token' , JSON.stringify(res.user?.uid))
    })
  }
  //FIRESTORE
  getMessages(){
    return this.fireService.collection('User-chat-messages').snapshotChanges();
  }  
  
  addMessage(message:any){
    return this.fireService.collection('User-chat-messages').add(message)
  }

  deleteMessage(messageId :any){
    this.fireService.doc('User-chat-messages/' + messageId).delete();
  }
}
