import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Pokemon, Type } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { } from 'googlemaps';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map!: google.maps.Map;

  ngOnInit(): void {

    localStorage.clear()
    this.route.queryParams.subscribe( params => {
      console.log(params)  
      this.paymentId = params['paymentId'],
      this.payerId = params['PayerID']
      if(this.paymentId && this.payerId){
        this.completePayment(this.paymentId, this.payerId)
      }
    })
  }

  ngAfterViewInit():void{
    const mapProperties = {
      center: new google.maps.LatLng(1.2922, 103.776, false),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(1.2923210380975625, 103.7765463514608),
      map: this.map})
    
  }

  completePayment(paymentId: string, payerId: string) {
    let param = new HttpParams()
    param = param.set("paymentId", paymentId)
    param = param.set("PayerID", payerId)
    return this.http.post('paypal/complete/payment', paymentId, {
      params: param
    }).subscribe((response) => console.log(response))
  }

  title = 'raysonLimAngular';
  paymentId;
  payerId;
  private http = inject(HttpClient)
  private route = inject(ActivatedRoute)

  token = localStorage.getItem("token")
  private router = inject(Router)
  pokemon: Pokemon
  type: Type

  onPokemonFormSubmission(p : Pokemon) {
    this.pokemon = p
    console.log(this.pokemon.toString())
  }

  onTypeFormSubmission(t: Type){
    this.type = t
  }

}
