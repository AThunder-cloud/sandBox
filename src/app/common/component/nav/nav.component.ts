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
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDarkScheme.matches;
    this.applyTheme(this.isDarkMode); // Apply the initial theme based on preference
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
  
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
  }
  applyTheme(isDark: boolean) {
    this.cmevnt.isDarkModeSubject.next(isDark);
    const darkThemeLink = document.getElementById('dark-theme-style') as HTMLLinkElement;
    const lightThemeLink = document.getElementById('light-theme-style') as HTMLLinkElement;

    if (isDark) {
      if (darkThemeLink) darkThemeLink.disabled = false;
      if (lightThemeLink) lightThemeLink.disabled = true;
      document.body.classList.add('dark-theme');
    } else {
      if (darkThemeLink) darkThemeLink.disabled = true;
      if (lightThemeLink) lightThemeLink.disabled = false;
      document.body.classList.remove('dark-theme');
    }
  }
 
}
