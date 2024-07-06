import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router';
import AuthenService from '@services/AuthenService'


@Component({
  selector: 'Header',
  templateUrl: './Header.html',
})
export default class {
  @Inject(Router) router
  @Inject(AuthenService) authenService
  name = 'test ok'
  tests = [1, 2, 3]

  goTo(url) {
    this.router.navigate([url])
  }

  handleClick() {
    this.name += ' ok'
  }
}
