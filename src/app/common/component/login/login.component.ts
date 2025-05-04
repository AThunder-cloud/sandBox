import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public authService: AuthService,private route:Router) {}
  user : User | null= null;
  async login() {
    this.user = await this.authService.googleSignIn()
    if(this.user){
      this.route.navigate(['/home'])
    };
  }

  async logout() {
    this.user = await this.authService.logout();
  }
}
