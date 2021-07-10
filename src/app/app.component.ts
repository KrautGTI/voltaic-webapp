import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './shared/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Voltaic';
  loading = false;

  constructor(private loaderService: LoaderService, private router: Router,) { }

  ngOnInit() {
    this.loaderService.loader$.subscribe(value => {
      this.loading = value;
    });
  }
}
