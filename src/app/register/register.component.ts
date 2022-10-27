import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm = new FormGroup({
    email : new FormControl('' , [Validators.required , Validators.email]),
    password : new FormControl('' , Validators.required)
})
  show = false;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register(){
    this.auth.register(this.loginForm.value);
    this.loginForm.reset();
  }

  password() {
    this.show = !this.show;
  }

}
