import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { routeModel } from '../../models/route.model';
import { routeItemsList } from './routeItems.list';
import { LoaderService } from '../../service/loader.service';
import { CommonEventService } from '../../service/common-event.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  routeItems : routeModel[] = [];
  showSlide:boolean = false;
  expandSideBar:boolean = false;

  constructor(private cmevnt:CommonEventService){}

  ngOnInit(): void {
    this.routeItems = routeItemsList;
    this.cmevnt.expandSideBar$.subscribe((evn:boolean) => {console.log("oninit",evn); this.expandSideBar = evn})
  }

  slide(){
    this.showSlide = true;
    setTimeout(() => {
      this.showSlide = false;
    }, 1000);
  }
}

@Component({
  selector: 'app-sider',
  template: '<div class="slider"></div>',
  styleUrls: ['./side-bar.component.scss']
})
export class SliderElement {

}
