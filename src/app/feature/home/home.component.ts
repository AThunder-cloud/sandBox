import { Component } from '@angular/core';
import { ToastService } from 'src/app/common/service/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cards = new Array(30)
  constructor(private pt:ToastService){}

  show(){
    this.pt.showSuccess('Message Content',"API Call Sucessfull")
    
  }

}
