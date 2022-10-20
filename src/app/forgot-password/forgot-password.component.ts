import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // email : string = '';
  loginForm = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' , Validators.required)
})
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
   }

   forgotPassword(){
    this.auth.forgotPassword(this.loginForm.value);
    console.log(this.loginForm.value);
    // this.email = '';
   }

}
