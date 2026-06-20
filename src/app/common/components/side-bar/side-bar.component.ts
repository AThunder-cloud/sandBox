import { Component, OnInit, inject } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Ripple } from 'primeng/ripple';

import { routeModel } from '../../models/route.model';
import { routeItemsList } from './routeItems.list';
import { CommonEventService } from '../../services/common-event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  imports: [
    NgClass, 
    NgStyle, 
    RouterLink, 
    Ripple,
    RouterLinkActive
  ]
})
export class SideBarComponent implements OnInit {
  private readonly cmevnt = inject(CommonEventService);
  private readonly authService = inject(AuthService);

  routeItems: routeModel[] = [];
  showSlide = true;
  expandSideBar = false;

  constructor() {
    this.cmevnt.expandSideBar$
      .pipe(takeUntilDestroyed())
      .subscribe(expanded => this.expandSideBar = expanded);
  }

  ngOnInit(): void {
    this.routeItems = routeItemsList;
  }

  triggerSlideAnimation() {
    this.showSlide = true;
    setTimeout(() => this.showSlide = false, 800); // sync with CSS animation time
  }

  logout() {
    this.authService.logout();
  }
}

@Component({
  selector: 'app-sider',
  template: '<div class="slider"></div>',
  styleUrls: ['./side-bar.component.scss']
})
export class SliderElement {

}
