import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' , Validators.required)
  })
  show = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.auth.login(this.loginForm.value);
    this.loginForm.reset();
  }
  signInWithGoogle(){
    this.auth.signInWithGoogle();
  }

  password() {
    this.show = !this.show;
  }
}
