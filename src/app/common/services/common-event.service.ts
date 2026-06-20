import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonEventService {
  //For Side Bar Expand-Collapse event
  private expandSideBarSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public expandSideBar$: Observable<boolean> = this.expandSideBarSubject.asObservable();

  public isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable();

  constructor() { }

  expand(){
    this.expandSideBarSubject.next(true);
  }
  collapse(){
    this.expandSideBarSubject.next(false);
  }
}
