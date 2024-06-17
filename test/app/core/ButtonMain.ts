import { Component, EventEmitter, Input, Output } from '@angular/core'


@Component({
  selector: 'ButtonMain',
  templateUrl: './ButtonMain.html',
})
export default class {
  @Input() name = ''
  @Output() onClick = new EventEmitter()

  handleClick() {
    this.onClick.emit()
  }
}
