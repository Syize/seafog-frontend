import { Component, OnInit } from '@angular/core';
import { NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { QueryDateService } from "../query-date.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private queryDate: QueryDateService) { }

  years = [1990,]
  monthes = Array.from({ length: 12 }, (_, i) => 1 + i)
  days = [1,]
  hours = Array.from({ length: 24 }, (_, i) => 1 + i)
  selectYear!: number;
  selectMonth!: number;
  selectDay!: number;
  selectHour!: number;
  currentYear!: number;
  currentMonth!: number;
  currentDay!: number;
  currentHour!: number;

  CLMChecked: boolean = false;
  SFMChecked: boolean = false;
  CLPChecked: boolean = false;
  FOTChecked: boolean = false;
  FERChecked: boolean = false;
  LWPChecked: boolean = false;
  CSRChecked: boolean = false;
  SSTChecked: boolean = false;

  displayedImageNum = 1;
  displayImageLimitNum = 4;
  isDisable = false;

  ngOnInit(): void {
    let currentDate = new Date()
    this.currentYear = currentDate.getFullYear()
    this.currentMonth = currentDate.getMonth() + 1  // WTF is this ???
    this.currentDay = currentDate.getDate()
    this.currentHour = currentDate.getHours()

    console.log(`current date: ${this.currentYear}-${this.currentMonth}-${this.currentDay} ${this.currentHour}:00:00`)

    let startYear = 2015
    this.years = Array.from({ length: this.currentYear - startYear + 1 }, (_, i) => this.currentYear - i)

    this.selectYear = this.currentYear
    this.selectMonth = this.currentMonth
    this.days = this._getDayArray()
    this.selectDay = this.currentDay
    this.selectHour = this.currentHour

  }

  ngAfterViewInit(): void {
    this.queryDate.onCanvasInitDone().subscribe((value) => {
      this.onSelectHourChange()
    })
  }

  onSelectYearChange(): void {
    this.monthes = this._getMonthArray()

    this.onSelectMonthChange()
  }

  onSelectMonthChange(): void {
    this.days = this._getDayArray()

    console.log(this.selectDay)
    console.log(this.days[this.days.length - 1])
    if (this.selectDay > this.days[this.days.length - 1]) {
      this.selectDay = this.days[this.days.length - 1]
    }

    this.onSelectDayChange()
  }

  onSelectDayChange(): void {
    this.onSelectHourChange()
  }

  onSelectHourChange(): void {
    this.queryDate.setImageDate({
      "year": this.selectYear,
      "month": this.selectMonth,
      "day": this.selectDay,
      "hour": this.selectHour
    })
  }

  onCLMChange(value: boolean) {
    this.CLMChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "CLM": value })
  }

  onCLPChange(value: boolean) {
    this.CLPChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "CLP": value })
  }

  onSFMChange(value: boolean) {
    this.SFMChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "SFM": value })
  }

  onFOTChange(value: boolean) {
    this.FOTChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "FOT": value })
  }

  onFERChange(value: boolean) {
    this.FERChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "FER": value })
  }

  onLWPChange(value: boolean) {
    this.LWPChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "LWP": value })
  }

  onCSRChange(value: boolean) {
    this.CSRChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "CSR": value })
  }

  onSSTChange(value: boolean) {
    this.SSTChecked = value
    this._onProductCheck(value)
    this.queryDate.changeProduct({ "SST": value })
  }

  _onProductCheck(value: boolean) {
    if (value) {
      this.displayedImageNum++
      if (this.displayedImageNum >= this.displayImageLimitNum) {
        this.isDisable = true
      }
    } else {
      this.displayedImageNum--
      if (this.displayedImageNum < this.displayImageLimitNum) {
        this.isDisable = false
      }
    }
  }

  _getMonthArray(): Array<number> {
    if (this.selectYear < this.currentYear) {
      return Array.from({ length: 12 }, (_, i) => 1 + i)
    } else {
      return Array.from({ length: this.currentMonth + 1 }, (_, i) => 1 + i)
    }
  }

  _getDayArray(): Array<number> {
    if ([1, 3, 5, 7, 8, 10, 12].includes(this.selectMonth)) {
      return Array.from({ length: 31 }, (_, i) => 1 + i)
    }
    else if (this.selectMonth == 2) {
      if ((this.selectYear % 4 == 0 && this.selectYear % 100 != 0) || this.selectYear % 400 == 0) {
        return Array.from({ length: 29 }, (_, i) => 1 + i)
      }
      else {
        return Array.from({ length: 28 }, (_, i) => 1 + i)
      }
    }
    else {
      return Array.from({ length: 30 }, (_, i) => 1 + i)
    }
  }
}
