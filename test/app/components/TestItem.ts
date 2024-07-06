import { Component, Inject } from '@angular/core'
import Test from '@components/Test'
import TestService from '@components/TestService'

@Component({
  selector: 'TestItem',
  templateUrl: './TestItem.html'
})
export default class {
  @Inject(Test) test
  @Inject(TestService) testService

  ngOnInit() {
    //    console.log('TestItem this.test', this.test)
    //    console.log('TestItem this.testService', this.testService)
    //    console.log('TestItem this.testService.key', this.testService.key)
  }
}
