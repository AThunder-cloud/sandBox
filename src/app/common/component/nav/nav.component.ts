import { Component, OnInit } from '@angular/core';
import { CommonEventService } from '../../service/common-event.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: false
})
export class NavComponent implements OnInit{
  openSideBar:boolean = false;
  isDarkMode : boolean = true;
  constructor(private cmevnt:CommonEventService){
  }
  ngOnInit(): void { 

  }

  expandTrigger(){
    this.cmevnt.expand();
    this.openSideBar = true
    setTimeout(() => {
      this.openSideBar = false
    }, 700);
  }
}
