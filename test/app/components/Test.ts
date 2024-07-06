import { Component, Input, Inject } from '@angular/core'
import TestService from '@components/TestService'


@Component({
  selector: 'Test',
  templateUrl: './Test.html',
//  providers: [TestService]
})
export default class {
//  @Inject(TestService) testService
  @Input() key

  ngOnInit() {
//    console.log('this.testService.key', this.testService.key)
  }
}
