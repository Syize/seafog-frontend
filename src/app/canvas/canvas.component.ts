import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgOptimizedImage, NgStyle, NgFor } from "@angular/common";
import { QueryDateService } from "../query-date.service";

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgFor
  ],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss'
})
export class CanvasComponent implements OnInit {

  constructor(
    private queryDate: QueryDateService,
    private changeDetector: ChangeDetectorRef,
  ) { }

  imageRootUrl = "http://img.seafog.syize.cn"

  IMAGE_DATE!: Record<string, number>
  innerDivStyle = {
    'height': '100%',
    'width': '100%',
    'display': 'flex',
    'justify-content': 'center'
  }

  imageMap = {
    "VIS": "",
    "CLM": "",
    "SFM": "",
  }

  displayedImageUrlRecords: Record<string, string> = {
  }
  imageArray!: string[][]
  testImageCounter = 1

  ngOnInit(): void {
    this._constructImageArray()
    this.setInnerDivStyle()
  }

  ngAfterViewInit(): void {
    this.queryDate.getImageDate().subscribe((value) => {
      this.onImageDateChange(value)
    })

    this.queryDate.onProductChange().subscribe((value) => {
      this.onProductChange(value)
    })

    this.queryDate.canvasInitDone()
    this.changeDetector.detectChanges()
  }

  setInnerDivStyle() {
    if (this.imageArray.length == 1) {
      this.innerDivStyle = {
        'height': '100%',
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center'
      }
    } else {
      this.innerDivStyle = {
        'height': '50%',
        'width': '100%',
        'display': 'inline-flex',
        'justify-content': 'center'
      }
    }
  }

  onImageDateChange(imageDate: Record<string, number>) {
    this.IMAGE_DATE = imageDate
    let keys = Object.keys(this.displayedImageUrlRecords)

    if (keys.length == 0) {
      this.displayedImageUrlRecords["RGB"] = this._constructImageUrl("RGB")
    } else {
      for (let index in keys) {
        let key = keys[index]
        this.displayedImageUrlRecords[key] = this._constructImageUrl(key)
      }
    }

    this._constructImageArray()
  }

  onProductChange(data: Record<string, boolean>) {
    let key = Object.keys(data)[0]
    if (data[key]) {
      this.addImageUrl(key, this._constructImageUrl(key))
    } else {
      this.removeImageUrl(key)
    }
  }

  addImageUrl(name: string, url: String) {
    this.displayedImageUrlRecords[name] = url.toString()
    this._constructImageArray()
  }

  removeImageUrl(name: string) {
    if (name in this.displayedImageUrlRecords) {
      delete this.displayedImageUrlRecords[name]
      this._constructImageArray()
      this.setInnerDivStyle()
    }
  }

  _constructImageArray() {
    let displayedImageUrl = Object.values(this.displayedImageUrlRecords)
    if (displayedImageUrl.length <= 2) {
      this.imageArray = [displayedImageUrl]
    } else {
      this.imageArray = [
        displayedImageUrl.slice(0, 2),
        displayedImageUrl.slice(2)
      ]
    }

    this.setInnerDivStyle()
  }

  _constructImageUrl(name: string): string {
    let year = this.IMAGE_DATE["year"]
    let month = this.IMAGE_DATE["month"]
    let day = this.IMAGE_DATE["day"]
    let hour = this.IMAGE_DATE["hour"]

    return `${this.imageRootUrl}/${name}/${year}/${month}/${day}/H9_${year}${month}${day}_${hour}00_${name}_d1.jpg`
  }
}
