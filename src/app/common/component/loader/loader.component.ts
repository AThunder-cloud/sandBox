import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy{

  ngOnInit(): void {
    console.log("Loader is on")
  }

  ngOnDestroy(): void {
    console.log("Loader is off")
  }

}
