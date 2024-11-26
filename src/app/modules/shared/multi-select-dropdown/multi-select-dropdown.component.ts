import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Selectable} from "../model/Selectable";

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent implements OnChanges {
  @Input({required: true})
  labelName!: string

  @Input({required: true})
  options!: Selectable[]

  @Input()
  selectedOptions: Selectable[] = [];

  @Input({required: true})
  valid: undefined | boolean

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionChangeEvent: EventEmitter<Selectable[]> = new EventEmitter<any[]>

  @Output()
  touchEvent: EventEmitter<boolean> = new EventEmitter<boolean>

  showSelections = false;
  selectedOptionsInputValue = '';

  ngOnChanges(): void {
    this.updateView();
  }

  isChecked(option: Selectable) {
    return this.selectedOptions.filter(selectedOption => selectedOption.id == option.id).length == 1
  }

  updateView() {
    this.selectedOptionsInputValue = this.selectedOptions.map(item => item.displayName).join(', ');
  }

  toggleSelection(option: Selectable, event: Event) {
    const checkbox = event.target as HTMLInputElement

    if (checkbox.checked) {
      this.selectedOptions.push(option)
    } else {
      this.selectedOptions = this.selectedOptions.filter(item => item !== option)
    }

    this.selectionChangeEvent.emit(this.selectedOptions)

    this.selectedOptionsInputValue = '';
    this.updateView();
  }

  markAsTouched() {
    this.touchEvent.emit(true)
  }
}
