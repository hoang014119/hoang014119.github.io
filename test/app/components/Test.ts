import { Component, Input } from '@angular/core'


@Component({
  selector: 'Test',
  templateUrl: './Test.html'
})
export default class {
  @Input() line
}
