import { Component, Inject } from '@angular/core'
import TestService from '@components/TestService'

@Component({
  selector: 'TestItem',
  templateUrl: './TestItem.html'
})
export default class {
//  @Inject(TestService) testService

  ngOnInit() {
//    console.log('this.testService.key', this.testService.key)
  }
}
