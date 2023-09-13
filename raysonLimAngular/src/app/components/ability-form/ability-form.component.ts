import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Abilities } from 'src/app/models';
import { AbilityService } from 'src/app/services/ability.service';

@Component({
  selector: 'app-ability-form',
  templateUrl: './ability-form.component.html',
  styleUrls: ['./ability-form.component.css']
})
export class AbilityFormComponent {
  service = inject(AbilityService)
  private fb = inject(FormBuilder)
  typeForm: FormGroup
  a: Abilities

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      'name': this.fb.control<string>('')
    })
  }

  searchAbilityByName(name: string) {
    this.service.getAbilityByName(name).subscribe((response) => {
      this.a = response
      console.log(response)
    })
  }

  submit() {
    let name = this.typeForm.get('name').value
    name = name.replace(" ", "-").toLowerCase()
    console.log(name)
    this.searchAbilityByName(name)
    console.log("Input successful. Info for ability " + name + " is being called")
  }

  backToList(){
    this.a = null
  }
}
