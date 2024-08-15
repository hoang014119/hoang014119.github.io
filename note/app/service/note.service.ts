import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  data = { default: {} }
  async load() {

  }
  async save() {

  }
  get_groups() {

  }
  get_by_group(group) {
    return this.data[group]
  }
  get_by_id() {

  }
  update_by_id() {

  }
  remove_by_id() {

  }
}
