import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueryDateService {

  private imageDate: Subject<String> = new Subject<String>()
  private CLMImageStatus: Subject<boolean> = new Subject<boolean>()
  private SFMImageStatus: Subject<boolean> = new Subject<boolean>()

  constructor() { }

  setImageDate(value: String): void {
    this.imageDate.next(value)
  }

  getImageDate() {
    return this.imageDate.asObservable()
  }

  setCLMImageStatus(value: boolean) {
    this.CLMImageStatus.next(value)
  }

  isCLMImageDisplay() {
    return this.CLMImageStatus.asObservable()
  }

  setSFMImageStatus(value: boolean) {
    this.SFMImageStatus.next(value)
  }

  isSFMImageDisplay() {
    return this.SFMImageStatus.asObservable()
  }

}
