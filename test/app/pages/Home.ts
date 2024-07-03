import { Component, ViewChild } from '@angular/core'


@Component({
  selector: 'Home',
  templateUrl: './Home.html'
})
export default class {
  @ViewChild('iframe') iframe = null

  ngOnInit() {
    console.log('iframe', this.iframe)
  }

  ngAfterViewInit() {
    console.log('iframe', this.iframe)
  }
}
