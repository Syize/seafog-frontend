import { Component, OnInit } from '@angular/core';
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgFor,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  years = [1990,]
  monthes = Array.from({ length: 12 }, (_, i) => 1 + i)
  days = [1,]
  selectYear!: number;
  selectMonth!: number;
  selectDay!: number;

  ngOnInit(): void {
    let currentDate = new Date()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth()
    let currentDay = currentDate.getDay()
    let startYear = 2015
    this.years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i)

    this.selectYear = currentYear
    this.selectMonth = 1
    this.selectDay = 1

  }

  onSelectYearChange(year: String): void {
    let numberYear = Number(year)
    this.selectYear = numberYear
    // check if we need to change month list
    if (this.selectMonth == 2) {

      if ((numberYear % 4 == 0 && numberYear % 100 != 0) || numberYear % 400 == 0) {
        this.days = Array.from({ length: 29 }, (_, i) => 1 + i)
      }
      else {
        this.days = Array.from({ length: 28 }, (_, i) => 1 + i)
      }
    }
  }

  onSelectMonthChange(month: String): void {
    this.selectMonth = Number(month)
    if (this.selectMonth in [1, 3, 5, 7, 8, 10, 12]) {
      this.days = Array.from({ length: 31 }, (_, i) => 1 + i)
    }
    else if (this.selectMonth == 2) {
      this.onSelectYearChange(this.selectYear.toString())
    }
    else {
      this.days = Array.from({ length: 30 }, (_, i) => 1 + i)
    }
  }

  onSelectDayChange(day: String): void {

  }

}
