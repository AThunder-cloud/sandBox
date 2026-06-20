import { Component, ElementRef, HostListener, Renderer2, ViewChild, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { routeModel } from '../../models/route.model';
import { routeItemsList } from './routeItems.list';
import { CommonEventService } from '../../services/common-event.service';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgStyle } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  imports: [NgClass, Ripple, RouterLink, NgStyle, forwardRef(() => SliderElement)]
})
export class SideBarComponent {
  private cmevnt: CommonEventService = inject(CommonEventService);
  public authService: AuthService = inject(AuthService);

  routeItems: routeModel[] = [];
  showSlide: boolean = false;
  expandSideBar: boolean = false;

  constructor() {
    // Automatically handles unsubscription when component destroys
    this.cmevnt.expandSideBar$
      .pipe(takeUntilDestroyed())
      .subscribe(evn => this.expandSideBar = evn);
  }

  ngOnInit(): void {
    this.routeItems = routeItemsList;
  }

  slide() {
    this.showSlide = true;
    setTimeout(() => {
      this.showSlide = false;
    }, 1200);
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
