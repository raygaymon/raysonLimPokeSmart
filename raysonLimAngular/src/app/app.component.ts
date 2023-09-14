import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Pokemon, Type } from './models';
import { ActivatedRoute, Router } from '@angular/router';
import { } from 'googlemaps';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog'
import { UserServiceService } from './services/user-service.service';
import { RegisterAndLoginComponent } from './components/register-and-login/register-and-login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DonationComponent } from './components/donation/donation.component';
import { ForumPopupComponent } from './components/forum-popup/forum-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map!: google.maps.Map;

  title = 'raysonLimAngular';
  paymentId;
  payerId;

  private http = inject(HttpClient)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private dialogRef = inject(MatDialog)

  token: string
  private login = inject(UserServiceService)
  pokemon: Pokemon
  type: Type


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

    this.login.tokenEmitter$.subscribe((response)=> {
      console.log("subbed to token")
        this.token = response
      })
    
  }

  completePayment(paymentId: string, payerId: string) {
    let param = new HttpParams()
    param = param.set("paymentId", paymentId)
    param = param.set("PayerID", payerId)
    return this.http.post('paypal/complete/payment', paymentId, {
      params: param
    }).subscribe((response) => {
      console.log(response)
      this.dialogRef.open(ForumPopupComponent, {
        data: {
          'message': 'Your payment wen through successfully! Please check your email for your receipt.',
        }
    })
    }
    )
  }

  loginPopUp(){
    this.dialogRef.open(RegisterAndLoginComponent, {
      height: 'auto',
      width: '60%',
    });
  }

  donationPopUp(){
    this.dialogRef.open(DonationComponent, {
      height: 'auto',
      width: '40%',
    })
  }

  logOutPopUp(){
    console.log("logging out")
    this.dialogRef.open(LogoutComponent, {
      data : {
        'name': localStorage.getItem('username')
      },
      height: 'auto',
      width: '60%',
    })
  }

  logout(){
    console.log()
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
