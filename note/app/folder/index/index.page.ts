import { Component } from '@angular/core'

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
})
export class IndexPage {
  indexs = 'a'.repeat(100).split('')
}