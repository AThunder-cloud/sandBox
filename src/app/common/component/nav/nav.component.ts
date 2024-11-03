import { Component, OnInit } from '@angular/core';
import { CommonEventService } from '../../service/common-event.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  openSideBar:boolean = false;
  isDarkMode : boolean = false;
  constructor(private cmevnt:CommonEventService){
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    // this.isDarkMode = prefersDarkScheme.matches;
    this.toggleDarkMode(); // Apply the initial theme based on preference
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
    this.cmevnt.isDarkModeSubject.next(this.isDarkMode);
    const darkThemeLink = document.getElementById('dark-theme-style') as HTMLLinkElement;
    const lightThemeLink = document.getElementById('light-theme-style') as HTMLLinkElement;

    if (this.isDarkMode) {
        darkThemeLink.disabled = false;
        lightThemeLink.disabled = true;
        document.body.classList.add('dark-theme'); // Add dark theme class
    } else {
        darkThemeLink.disabled = true;
        lightThemeLink.disabled = false;
        document.body.classList.remove('dark-theme'); // Remove dark theme class
    }
  }
 
}
