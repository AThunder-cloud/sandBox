import { Component, inject } from '@angular/core';
import { CommonEventService } from '../../services/common-event.service';
import { NgClass } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [
    NgClass
  ]
})
export class NavComponent  {
  private cmevnt: CommonEventService = inject(CommonEventService);
  private themeService: ThemeService = inject(ThemeService);

  openSideBar: boolean = false;

  expandTrigger() {
    this.cmevnt.expand();
    this.openSideBar = true
    setTimeout(() => {
      this.openSideBar = false
    }, 700);
  }
  
  // Expose the signal state to the template template context
  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }
}
