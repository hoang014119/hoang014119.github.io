import { Component, EventEmitter, Input, Output } from '@angular/core'


@Component({
  selector: 'InputMain',
  templateUrl: './InputMain.html',
})
export default class {
  @Input() name = ''
  @Output() nameChange = new EventEmitter()
  @Input() value = ''

  handleClick() {
    this.nameChange.emit(this.value)
  }
}
