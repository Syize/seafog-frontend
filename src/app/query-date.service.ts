import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueryDateService {

  private imageDate: Subject<object> = new Subject<object>()
  // private imageDate: Subject<Ma
  private CLMImageStatus: Subject<boolean> = new Subject<boolean>()
  private CLPImageStatus: Subject<boolean> = new Subject<boolean>()
  private SFMImageStatus: Subject<boolean> = new Subject<boolean>()
  private FOTImageStatus: Subject<boolean> = new Subject<boolean>()
  private FERImageStatus: Subject<boolean> = new Subject<boolean>()
  private LWPImageStatus: Subject<boolean> = new Subject<boolean>()
  private CSRImageStatus: Subject<boolean> = new Subject<boolean>()
  private SSTImageStatus: Subject<boolean> = new Subject<boolean>()

  constructor() { }

  setImageDate(value: object): void {
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

  setCLPImageStatus(value: boolean) {
    this.CLPImageStatus.next(value)
  }

  isCLPImageDisplay() {
    return this.CLPImageStatus.asObservable()
  }

  setFOTImageStatus(value: boolean) {
    this.FOTImageStatus.next(value)
  }

  isFOTImageDisplay() {
    return this.FOTImageStatus.asObservable()
  }

  setFERImageStatus(value: boolean) {
    this.FERImageStatus.next(value)
  }

  isFERImageDisplay() {
    return this.FERImageStatus.asObservable()
  }

  setLWPImageStatus(value: boolean) {
    this.LWPImageStatus.next(value)
  }

  isLWPImageDisplay() {
    return this.LWPImageStatus.asObservable()
  }

  setCSRImageStatus(value: boolean) {
    this.CSRImageStatus.next(value)
  }

  isCSRImageDisplay() {
    return this.CSRImageStatus.asObservable()
  }

  setSSTImageStatus(value: boolean) {
    this.SSTImageStatus.next(value)
  }

  isSSTImageDisplay() {
    return this.SSTImageStatus.asObservable()
  }

  setSFMImageStatus(value: boolean) {
    this.SFMImageStatus.next(value)
  }

  isSFMImageDisplay() {
    return this.SFMImageStatus.asObservable()
  }

}
