import { Component, OnDestroy, OnInit } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  isLoggedIn = false;
  subscription: Subscription | any;
  constructor(public authService : AuthService,private darkModeService: DarkModeService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe(val => this.isLoggedIn = val);
    if(localStorage.getItem('token')) {
      this.authService.userSource.next(true);
    }
    
  }

  logOut() { 
    this.authService.logout();
  }

  onValChange(): void {
    this.darkModeService.toggle();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
