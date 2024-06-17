import { Component, Inject } from '@angular/core'
import Test from './Test'

@Component({
  selector: 'TestItem',
  templateUrl: './TestItem.html'
})
export default class {
  //  @Inject(Test) 
  test = ''

  ngOnInit() {
    //    console.log('test', this.test)
  }
}
