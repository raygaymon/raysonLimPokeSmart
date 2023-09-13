import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  private fb = inject(FormBuilder)
  private http = inject(HttpClient)
  shop: FormGroup
  amountToPay: number = 0
  item: { name: string, price: number }
  inventory: string[] = ['shirt', 'blanket', 'badge', 'pants', 'hat']
  cart: any[] = []

  ngOnInit(): void {
    this.shop = this.fb.group({
      'shirtqty': this.fb.control<number>(0),
      'blanketqty': this.fb.control<number>(0),
      'badgeqty': this.fb.control<number>(0),
      'pantsqty': this.fb.control<number>(0),
      'hatqty': this.fb.control<number>(0),
    })
  }

  addToCart() {
    let shirt = {name: 'shirt', qty: this.shop.get('shirtqty').value}
    this.cart.push(shirt)
    let blanket = {name: 'blanket', qty: this.shop.get('blanketqty').value}
    this.cart.push(blanket)
    let badge = {name: 'badge', qty: this.shop.get('badgeqty').value}
    this.cart.push(badge)
    let pants = {name: 'pants', qty: this.shop.get('pantsqty').value}
    this.cart.push(pants)
    let hat = {name: 'hat', qty: this.shop.get('hatqty').value}
    this.cart.push(hat)

    this.amountToPay = (this.shop.get('shirtqty').value * 25) + (this.shop.get('blanketqty').value * 80) + (this.shop.get('badgeqty').value * 3) + (this.shop.get('pantsqty').value * 40) + (this.shop.get('hatqty').value * 10)
  }

  makePayment() {
    console.log("testing payment")
    return this.http.post<any>('/paypal/make/payment', this.amountToPay, {
      params: { "sum": this.amountToPay }
    }).subscribe((response) => {
      console.log(response)
      window.location.href = response.redirect_url
    })
  }

}

