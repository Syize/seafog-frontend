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

  imageNum = 1
  imageArray = [
    // ["http://img.seafog.syize.cn/1.jpg"],
    ["https://picsum.photos/722/725"],
    ["https://picsum.photos/722/725?x=1"],
    ["https://picsum.photos/722/725?x=2"],
    ["https://picsum.photos/722/725?x=3"],
  ]

  testImageCounter = 1

  ngAfterViewInit(): void {
    this.queryDate.getImageDate().subscribe(this.onImageDateChange)
    this.queryDate.addButtonSubscribe().subscribe((value) => {
      console.log(this.imageNum)
      if (this.imageNum == 4) {
        return
      }
      this.imageNum++
      this.addImageUrl("http://img.seafog.syize.cn/" + this.imageNum + ".jpg")
    })
    this.queryDate.clearButtonSubscribe().subscribe((value) => {
      this.removeImageUrl()
    })
  }

  onImageDateChange(imageDate: String) {
    this.IMAGE_DATE = imageDate
  }


  ngOnInit(): void {
  }

  addImageUrl(url: String) {
    // if (this.imageNum == 4) {
    //   return
    // }
    if (this.imageArray.length == 1) {
      if (this.imageArray[0].length == 1) {
        this.imageArray.push([url.toString()])
      } else {
        this.imageArray[0].push(url.toString())
      }
    } else {
      if (this.imageArray[0].length == 1) {
        this.imageArray[0].push(this.imageArray[1][0])
        this.imageArray[1][0] = url.toString()
      } else {
        this.imageArray[1].push(url.toString())
      }
    }
    // this.imageNum++
  }

  removeImageUrl() {
    if (this.imageArray.length == 2) {
      if (this.imageArray[1].length == 2) {
        this.imageArray[1].splice(1, 1)
      } else if (this.imageArray[0].length == 2) {
        this.imageArray[1][0] = this.imageArray[0][1]
        this.imageArray[0].splice(1, 1)
      } else {
        this.imageArray.splice(1, 1)
      }
    }
    this.imageNum--
  }

  testImage(value: number) {
    this.imageNum++
    this.addImageUrl("http://img.seafog.syize.cn/" + this.imageNum + ".jpg")
  }
}
