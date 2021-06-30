import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader = new Subject<boolean>();
  public loader$ = this.loader.asObservable();
  constructor() { }
  show() {
    this.loader.next(true);
  }

  hide() {
    this.loader.next(false);
  }
}
