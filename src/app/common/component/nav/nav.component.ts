import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, } from '@angular/forms';
import { CommonEventService } from '../../service/common-event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  openSideBar:boolean = false;
  
  constructor(private cmevnt:CommonEventService){}
  ngOnInit(): void {   }

  expandTrigger(){
    this.cmevnt.expand();
    this.openSideBar = true
    setTimeout(() => {
      this.openSideBar = false
    }, 700);
  }
 
}
