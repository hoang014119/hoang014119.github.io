import { Component, Inject, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import AuthenService from '@services/AuthenService'


@Component({
  selector: 'Account',
  templateUrl: './Account.html'
})
export default class {
  @Inject(AuthenService) authenservice
  @ViewChild('iframe') iframe

  ngOnInit() {
    console.log('iframe', this.iframe)
  }

  ngAfterViewInit() {
    console.log('iframe', this.iframe.nativeElement)
  }
}
