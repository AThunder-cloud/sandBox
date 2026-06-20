import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';
import { Router } from '@angular/router';
import { TypewriterComponent } from '../typewriter/typewriter.component';
import { Bind } from 'primeng/bind';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [TypewriterComponent, Bind, Button]
})
export class LoginComponent {
  public authService: AuthService = inject(AuthService);
  private route: Router = inject(Router);

  constructor() { }
  user: User | null = null;
  async login() {
    this.user = await this.authService.googleSignIn()
    if (this.user) {
      this.route.navigate(['/home'])
    };
  }

  async logout() {
    this.user = await this.authService.logout();
  }
}
