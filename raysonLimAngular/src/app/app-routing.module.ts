import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { TypeFormComponent } from './components/type-form/type-form.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { MoveFormComponent } from './components/move-form/move-form.component';
import { AbilityFormComponent } from './components/ability-form/ability-form.component';
import { LocationAreaDetailsComponent } from './components/location-area-details/location-area-details.component';
import { EncounterSimulatorComponent } from './components/encounter-simulator/encounter-simulator.component';
import { DamageSimulatorComponent } from './components/damage-simulator/damage-simulator.component';
import { ForumComponent } from './components/forum/forum.component';
import { RegisterAndLoginComponent } from './components/register-and-login/register-and-login.component';
import { DonationComponent } from './components/donation/donation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pokemon', component: PokemonFormComponent},
  {path: 'pokemon/:name', component: PokemonComponent},
  {path: 'type', component: TypeFormComponent},
  {path: "item", component: ItemFormComponent},
  {path: 'move', component: MoveFormComponent},
  {path: 'ability', component: AbilityFormComponent},
  {path: 'location-area', component: LocationAreaDetailsComponent},
  {path: 'encounter-simulator', component: EncounterSimulatorComponent},
  {path: 'damage-simulator', component: DamageSimulatorComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'register-login', component: RegisterAndLoginComponent},
  {path: 'donate', component: DonationComponent},
  {path: 'pay', component: PaymentComponent},
  {path: 'cancel', component: PokemonComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
