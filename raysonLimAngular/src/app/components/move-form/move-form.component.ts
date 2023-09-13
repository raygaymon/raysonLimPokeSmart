import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Moves } from 'src/app/models';
import { MovesService } from 'src/app/services/moves.service';

@Component({
  selector: 'app-move-form',
  templateUrl: './move-form.component.html',
  styleUrls: ['./move-form.component.css']
})
export class MoveFormComponent {
  service = inject(MovesService)
  private fb = inject(FormBuilder)
  typeForm: FormGroup
  m: Moves

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      'name': this.fb.control<string>('')
    })
  }

  searchMoveByName(name: string) {
    this.service.getMoveByName(name).subscribe((response) => {
      this.m = response
      console.log(response)
    })
  }

  submit() {
    let name = this.typeForm.get('name').value
    name = name.replace(" ", "-").toLowerCase()
    console.log(name)
    this.searchMoveByName(name)
    console.log("Input successful. Info for item " + name + " is being called")
  }

  backToList() {
    this.m = null;
  }
}
