import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'voltaic';
  loading = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loader$.subscribe(value => {
      this.loading = value;
    });
  }
}
