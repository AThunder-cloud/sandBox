import { Component } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';
import { ToastService } from 'src/app/common/services/toast.service';
import { AsyncPipe } from '@angular/common';
import { Bind } from 'primeng/bind';
import { Card } from 'primeng/card';
import { Avatar } from 'primeng/avatar';
import { Chip } from 'primeng/chip';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [Bind, Card, Avatar, Chip, Tooltip, AsyncPipe]
})
export class HomeComponent {
  cards = new Array(30)
  constructor(
    private pt:ToastService,
    public authService:AuthService
  ){}

  show(){
    this.pt.showSuccess('Message Content',"API Call Sucessfull")
    
  }

}
