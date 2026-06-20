import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private showLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // Expose the observable for components to subscribe
  public showLoader$: Observable<boolean> = this.showLoaderSubject.asObservable();

  constructor() {}

  // Method to show the loader
  show() {
    this.showLoaderSubject.next(true);
  }

  // Method to hide the loader
  hide() {
    this.showLoaderSubject.next(false);
  }
}
