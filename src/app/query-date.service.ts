import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueryDateService {

  private imageDate: Subject<Record<string, number>> = new Subject<Record<string, number>>()
  private productChange: Subject<Record<string, boolean>> = new Subject<Record<string, boolean>>()
  private canvasInit: Subject<any> = new Subject<any>()

  constructor() { }

  setImageDate(value: Record<string, number>): void {
    this.imageDate.next(value)
  }

  getImageDate() {
    return this.imageDate.asObservable()
  }

  changeProduct(value: Record<string, boolean>) {
    this.productChange.next(value)
  }

  onProductChange() {
    return this.productChange.asObservable()
  }

  canvasInitDone() {
    this.canvasInit.next("")
  }

  onCanvasInitDone() {
    return this.canvasInit.asObservable()
  }

}
