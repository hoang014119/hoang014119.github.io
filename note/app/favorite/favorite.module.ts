import { Component, NgModule, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.module.html',
})
class FavoritePage {
  @ViewChild('area_editor') area_editor
  editor

  ngAfterViewInit() {
    // https://www.tiny.cloud/docs/tinymce/5/custom-basic-toolbar-button/
    console.log('editor', this.area_editor.nativeElement)
    console.log('tinymce', tinymce)
    this.editor = tinymce.init({
      target: this.area_editor.nativeElement,
      height: 500,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste imagetools wordcount'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    })[0]
    console.log('editor', this.editor)
  }

  async ngOnDestroy() {
    this.editor && (await this.editor).destroy()
  }
}


@NgModule({
  declarations: [FavoritePage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild([{ path: '', component: FavoritePage }])],
  //  exports: [RouterModule],
})
export class FavoriteModule { }
