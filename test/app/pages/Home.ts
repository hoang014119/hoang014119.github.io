import { Component, Inject } from '@angular/core'
import AuthenService from '@services/AuthenService'


@Component({
  selector: 'Home',
  templateUrl: './Home.html'
})
export default class {
  @Inject(AuthenService) authenservice
}
