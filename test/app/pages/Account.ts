import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router';
import AuthenService from '../services/AuthenService'


@Component({
  selector: 'Account',
  templateUrl: './Account.html'
})
export default class {
  @Inject(AuthenService) authenservice = ''
}
