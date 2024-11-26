import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
  @Input({required: true})
  labelName!: string;

  @Input()
  preselectedDatepickerValue?: Date

  @Output()
  dateChangeEvent: EventEmitter<Date> = new EventEmitter<Date>

  MONTH_NAMES = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ];
  DAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  showDatepicker = false;
  datepickerValue!: string;
  month!: number; // !: mean promis it will not be null, and it will definitely be assigned
  year!: number;
  no_of_days = [] as number[];
  blankdays = [] as number[];

  ngOnInit(): void {
    this.initDate();
    this.getNoOfDays();
  }

  ngOnChanges() {
    this.datepickerValue = new Date(this.year, this.month, this.preselectedDatepickerValue?.getDate()).toLocaleDateString()
  }

  initDate() {
    const today = new Date();

    this.month = today.getMonth();
    this.year = today.getFullYear();

    this.datepickerValue = new Date(this.year, this.month, today.getDate()).toLocaleDateString();
  }

  isToday(date: number) {
    const today = new Date();
    const d = new Date(this.year, this.month, date);
    return today.toLocaleDateString() === d.toLocaleDateString();
  }

  getDateValue(date: number) {
    const selectedDate = new Date(this.year, this.month, date);

    this.dateChangeEvent.emit(selectedDate);

    this.datepickerValue = selectedDate.toLocaleDateString();
    this.showDatepicker = false;
  }

  getNoOfDays() {
    const daysInMonth = new Date(2022, this.month + 1, 0).getDate();

    // find where to start calendar day of week
    const dayOfWeek = new Date(this.year, this.month).getDay();
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let x = 1; x <= daysInMonth; x++) {
      daysArray.push(x);
    }

    this.blankdays = blankdaysArray;
    this.no_of_days = daysArray;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trackByIdentity = (index: number, item: any) => item;
}
