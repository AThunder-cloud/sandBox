import { Component, inject } from '@angular/core';
import { CommonEventService } from '../../services/common-event.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [NgClass]
})
export class NavComponent  {
  private cmevnt: CommonEventService = inject(CommonEventService);
  openSideBar: boolean = false;
  isDarkMode: boolean = true;

  expandTrigger() {
    this.cmevnt.expand();
    this.openSideBar = true
    setTimeout(() => {
      this.openSideBar = false
    }, 700);
  }
}
