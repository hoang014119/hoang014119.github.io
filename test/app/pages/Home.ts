import { Component, Inject } from '@angular/core'
import { Title } from "@angular/platform-browser";
import AuthenService from '@services/AuthenService'


@Component({
  selector: 'Home',
  templateUrl: './Home.html'
})
export default class {
  @Inject(Title) titleService
  @Inject(AuthenService) authenService

  ngOnInit() {
    this.titleService.setTitle("Home");
  }

}
