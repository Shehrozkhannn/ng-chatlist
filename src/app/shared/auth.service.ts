import { Injectable } from '@angular/core'; 
import { AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {GoogleAuthProvider , GithubAuthProvider ,FacebookAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // email : string = '';

  constructor(private fireauth : AngularFireAuth , private router : Router , private fireService : AngularFirestore ) { }

  login(loginForm:any){
    // console.log(loginForm.email);
    this.fireauth.signInWithEmailAndPassword(loginForm.email , loginForm.password).then( (res:any) =>{
      localStorage.setItem('token', 'true');
      localStorage.setItem('id' , res.user?.multiFactor.user.uid);
      console.log(res);
      this.router.navigate(['/chatbox']);
    }, err => {   
      alert("Something went wrong");
      this.router.navigate(['/login'])
    })
    }
  register(loginForm:any){
    this.fireauth.createUserWithEmailAndPassword(loginForm.email , loginForm.password).then( res =>{
      alert("Registration Sucessful");
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message)
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
