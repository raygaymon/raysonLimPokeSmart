import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements AfterViewInit {

  //TODO: styling, add nice bg

  donationAmounts: number[] = [50, 100, 200, 500, 1000, 10000, 324903278409328]
  amount: number = 0

  @ViewChild('paymentRef') paymentRef!: ElementRef

  customAmt: boolean = true
  transactionMsg: string
  paypalButtonGenerated: boolean = false


  ngAfterViewInit():void{
    this.generateButton()
  }

  generateButton(){
    if(!this.paypalButtonGenerated){
      window.paypal.Buttons({
        style: {
          color: 'gold',
          shape: 'pill',
          layout: 'vertical'
        },
        createOrder: (data: any, action: any) => {
          return action.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency_code: 'USD'
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert("Transaction was successful! Thank you for supporting."),
              this.transactionMsg = "Transaction ID : " + details.id + "\nStatus: " + details.status +'\nThank you for supporting us'
          })
        },
        onError: (err) => {
          alert("Transaction was unsuccessful! D: I hope you get a job or something."),
            this.transactionMsg = "Transaction failed with ID : " + err.id + "\nStatus: " + err.status
        }
      }).render(this.paymentRef.nativeElement);
      this.paypalButtonGenerated= true
    }
    

  }

  togglePaymentAmount(){

    if(this.customAmt == false ){
      this.customAmt = true
    } else {
      this.customAmt = false
    }
    
  }

}
