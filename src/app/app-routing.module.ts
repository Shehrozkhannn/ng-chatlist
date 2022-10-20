import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { DetailsComponent } from './details/details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
  {
    path: "chatbox" , 
    component: ChatboxComponent
  },
  {
    path: 'userDetails',
    component:DetailsComponent
  },
  {
    path: 'register',
    component : RegisterComponent
  },
  {
    path : 'login', 
    component : LoginComponent
  },
  {
    path : 'verify-email', 
    component : VerifyEmailComponent
  } ,
  {
    path : 'forgot-password', 
    component : ForgotPasswordComponent 
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
