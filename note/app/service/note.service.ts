import { Injectable } from '@angular/core';


const data = {
  note: {
    default: []
  }
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  data = null

  async reload() {
    this.data = data
  }
  async check() {
    !this.data && await new Promise((res, loop) => (loop = () => setTimeout(() => window.console ? res() : loop(), 100))())
  }
  async save() {

  }
  async get_groups() {
    await this.check()
    return Object.keys(this.data)
  }
  async get_by_group(group) {
    await this.check()
    return this.data[group]
  }
  async get_by_id() {
    await this.check()
  }
  async update_by_id() {
    await this.check()
  }
  async remove_by_id() {
    await this.check()
  }
}
