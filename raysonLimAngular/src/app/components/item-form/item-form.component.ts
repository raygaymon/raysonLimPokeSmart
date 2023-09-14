import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent {
  service = inject(ItemService)
  private fb = inject(FormBuilder)
  typeForm: FormGroup
  i: Item
  errMsg: string

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      'name': this.fb.control<string>('')
    })
  }

  searchItemByName(name: string) {
    this.service.getItemByName(name).subscribe({
    next : (response) => {
    this.i = response
    console.log(response)
    }, 
      error: () => 
      this.errMsg = "Something went wrong, please double check the name you are searching"
  })
  }

  submit() {
    let name = this.typeForm.get('name').value
    name = name.replace(" ", "-").toLowerCase()
    console.log(name)
    this.searchItemByName(name)
    console.log("Input successful. Info for item " + name + " is being called")
  }

  backToList(){
    this.i = null;
  }
}
