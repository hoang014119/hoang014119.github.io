import { Component, Inject, ViewChild } from '@angular/core'
import { Title } from "@angular/platform-browser";
import AuthenService from '@services/AuthenService'


@Component({
  selector: 'Account',
  templateUrl: './Account.html'
})
export default class {
  @Inject(Title) titleService
  @Inject(AuthenService) authenService
  @ViewChild('iframe') iframe

  ngOnInit() {
    this.titleService.setTitle("Account");
    console.log('iframe', this.iframe)
  }

  ngAfterViewInit() {
    console.log('iframe', this.iframe.nativeElement)
  }
}
