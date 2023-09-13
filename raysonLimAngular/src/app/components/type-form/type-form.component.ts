import { Component, EventEmitter, inject, Output, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Type } from 'src/app/models';
import { TypeServiceService } from 'src/app/services/type-service.service';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent implements OnInit {

  @Output() typeSearched = new EventEmitter<Type>();
  service = inject(TypeServiceService)
  private fb = inject(FormBuilder)
  typeForm: FormGroup
  t: Type

  ngOnInit() : void {
    this.typeForm = this.fb.group({
      'name': this.fb.control<string>('')
    })
  }

  searchTypeByName(name: string ){
    name = name.toLowerCase()
    this.service.getTypeByName(name).subscribe((response) => {
      let t : Type
      this.t = response.Types
      t = response.Types
      this.typeSearched.emit(t)
  
    })
  }

  submit(){
    let name = this.typeForm.get('name').value
    this.searchTypeByName(name)
    console.log("Input successful. Info for type " + name + " is being called")
  }

  backToList(){
    this.t = null
  }

}
