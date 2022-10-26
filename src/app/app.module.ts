import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { DetailsComponent } from './details/details.component';
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DARK_MODE_OPTIONS } from 'angular-dark-mode';


@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment?.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatMenuModule,
    PickerModule,
    MatSlideToggleModule
  ],
  providers: [
    {
      provide: DARK_MODE_OPTIONS,
      useValue: {
          darkModeClass: 'my-dark-mode',
          lightModeClass: 'my-light-mode'
      }
  }
  ],
bootstrap: [AppComponent],
})
export class AppModule { }
