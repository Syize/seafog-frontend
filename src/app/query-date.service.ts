import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueryDateService {

  private imageDate: Subject<String> = new Subject<String>()
  private temp: Subject<number> = new Subject<number>()
  private temp2: Subject<number> = new Subject<number>()

  constructor() { }

  setImageDate(value: String): void {
    this.imageDate.next(value)
  }

  getImageDate() {
    return this.imageDate.asObservable()
  }

  addButton() {
    this.temp.next(1)
  }

  addButtonSubscribe() {
    return this.temp.asObservable()
  }

  clearButton() {
    this.temp2.next(1)
  }

  clearButtonSubscribe() {
    return this.temp2.asObservable()
  }

}
