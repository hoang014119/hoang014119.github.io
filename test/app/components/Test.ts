import { Component, Input, Inject } from '@angular/core'
import TestService from '@components/TestService'


@Component({
  selector: 'Test',
  templateUrl: './Test.html',
  providers: [TestService]
})
export default class {
  @Inject(TestService) testService
  @Input() key

  //  constructor() {
  //    console.log('Test this.key', this.key)
  //    //    console.log('Test this.testService', this.testService)
  //    //    console.log('Test this.testService.key', this.testService.key)
  //  }

  ngOnInit() {
//    console.log('Test this.key', this.key)
    //    this.testService.key = this.key
//    console.log('Test this.testService', this.testService)
    //    console.log('Test this.testService.key', this.testService.key)
  }
}
