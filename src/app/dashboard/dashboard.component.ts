import { Component, OnInit } from '@angular/core';
import { NgFor } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { QueryDateService } from "../query-date.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
    MatInputModule,
    MatSelectModule,
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

  ngOnInit(): void {
    let currentDate = new Date()
    this.currentYear = currentDate.getFullYear()
    this.currentMonth = currentDate.getMonth()
    this.currentDay = currentDate.getDay()
    let startYear = 2015
    this.years = Array.from({ length: this.currentYear - startYear + 1 }, (_, i) => this.currentYear - i)

    this.selectYear = this.currentYear
    this.selectMonth = 1
    this.selectDay = 1

  }

  onSelectYearChange(year: number): void {
    console.log(year)
    this.selectYear = year

    this.monthes = this._getMonthArray()

    this.days = this._getDayArray()
  }

  onSelectMonthChange(month: number): void {
    console.log(month)
    this.selectMonth = month

    this.days = this._getDayArray()
  }

  onSelectDayChange(day: number): void {
    console.log(day)
    this.queryDate.setImageDate(day.toString())
  }

  onSelectHourChange(hour: number): void {
    console.log(hour)
  }

  onCLMChange(value: String) {
    console.log(value)
  }

  onSFMChange(value: String) {
    console.log(value)
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
