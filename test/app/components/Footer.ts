import { Component, Inject } from '@angular/core'
import AuthenService from '@services/AuthenService'


@Component({
  selector: 'Footer',
  templateUrl: './Footer.html'
})
export default class {
  @Inject(AuthenService) authenservice
  name = 'test ok'
  lines = ['a 1', 'b 2']

  handleClick() {
    this.name += ' ok'
  }
}
