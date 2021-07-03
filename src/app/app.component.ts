import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/loader/loader.service';
import { LocationStrategy } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'voltaic';
  loading = false;

  constructor(private loaderService: LoaderService, private locationStrategy: LocationStrategy) { }

  ngOnInit() {
    this.loaderService.loader$.subscribe(value => {
      this.loading = value;
    });
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if(location.href.slice(location.href.length-5,location.href.length)=='login')
      history.forward();
  }
}
