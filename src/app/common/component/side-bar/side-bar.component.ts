import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { routeModel } from '../../models/route.model';
import { routeItemsList } from './routeItems.list';
import { LoaderService } from '../../service/loader.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  routeItems : routeModel[] = [];
  showSlide:boolean = false;

  constructor(private loader:LoaderService,private renderer: Renderer2, private el: ElementRef){}

  ngOnInit(): void {
    this.routeItems = routeItemsList;
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
