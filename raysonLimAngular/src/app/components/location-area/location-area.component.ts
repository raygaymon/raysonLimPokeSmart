import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { LocationAreaService } from 'src/app/services/location-area.service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { LocationArea } from 'src/app/models';

@Component({
  selector: 'app-location-area',
  templateUrl: './location-area.component.html',
  styleUrls: ['./location-area.component.css']
})
export class LocationAreaComponent implements OnInit {

  private service = inject(LocationAreaService)
  locationAreas = []
  pages = []
  currentPage: number
  private fb = inject(FormBuilder)
  pageNavigation: FormGroup

  @Output() laEmitter = new EventEmitter<string>();

  ngOnInit(): void {

    this.fillInPages(1)
    this.service.getAllLocationAreas().subscribe(response => {
      for(let la of response['location-areas']){
        la = la.replace(/-/g, " ")
        this.locationAreas.push(la)
      }
    })

  }

  fillInPages(page: number){
    for (let i = page; i <= page + 20; i++) {
      if(i <= 371){
        this.pages.push(i)
      }
    }
  }

  goToPage(page: number){
    this.locationAreas = []
    this.pages = []
    this.fillInPagesMiddle(page)
    console.log (+page + +20)
    this.service.changeOffset((+page * +20)).subscribe(response => {
      for (let la of response['location-areas']) {
        la = la.replace(/-/g, " ")
        this.locationAreas.push(la)
      }
    })
  }

  fillInPagesMiddle(page: number) {
    for (let i = page - 10; i < (+page + +10); i++) {
      if (i <= 641) {
        this.pages.push(i)
      }
    }
  }

  sendLocationAreaName(name: string){
    this.laEmitter.emit(name.replace(/ /g, "-").toLowerCase())
    console.log(name)
  }
  
}
