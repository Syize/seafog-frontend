import { Component, OnInit } from '@angular/core';
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

  constructor(private queryDate: QueryDateService) { }

  IMAGE_DATE: String = "1"
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
    "RGB": "http://img.seafog.syize.cn/RGB/2024/09/10/H9_20240910_1230_RGB_d1.jpg"
  }
  imageArray!: string[][]
  testImageCounter = 1

  ngOnInit(): void {
    this._constructImageArray()
    this.setInnerDivStyle()
  }

  ngAfterViewInit(): void {

  }

  setInnerDivStyle() {
    if (this.imageArray.length == 1) {
      // if (this.imageArray[0].length == 1) {
      this.innerDivStyle = {
        'height': '100%',
        'width': '100%',
        'display': 'flex',
        'justify-content': 'center'
      }
      // } else {
      //   this.innerDivStyle = {
      //     'height': '100%',
      //     'width': '100%',
      //     'display': 'inline-flex',
      //     'justify-content': 'center'
      //   }
      // }
    } else {
      this.innerDivStyle = {
        'height': '50%',
        'width': '100%',
        'display': 'inline-flex',
        'justify-content': 'center'
      }
    }
  }

  onImageDateChange(imageDate: String) {
    this.IMAGE_DATE = imageDate
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
}
