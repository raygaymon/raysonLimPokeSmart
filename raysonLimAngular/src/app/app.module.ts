import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { TypeComponent } from './components/type/type.component';
import { TypeFormComponent } from './components/type-form/type-form.component';
import { ServiceWorkerModule } from '@angular/service-worker';


import { ItemComponent } from './components/item/item.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { MovesComponent } from './components/moves/moves.component';
import { MoveFormComponent } from './components/move-form/move-form.component';
import { AbilityComponent } from './components/ability/ability.component';
import { AbilityFormComponent } from './components/ability-form/ability-form.component';
import { LocationAreaComponent } from './components/location-area/location-area.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { LocationAreaDetailsComponent } from './components/location-area-details/location-area-details.component';
import { TypeListComponent } from './components/type-list/type-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AbilityListComponent } from './components/ability-list/ability-list.component';
import { MoveListComponent } from './components/move-list/move-list.component';
import { SortMovesPipe } from './pipes/sort-moves.pipe';
import { SortByMethodPipe } from './pipes/sort-by-method.pipe';
import { SortEggMovesPipe } from './pipes/sort-egg-moves.pipe';
import { SortTMHMPipe } from './pipes/sort-tmhm.pipe';
import { SortTutorPipe } from './pipes/sort-tutor.pipe';
import { EncounterSimulatorComponent } from './components/encounter-simulator/encounter-simulator.component';
import { DamageSimulatorComponent } from './components/damage-simulator/damage-simulator.component';
import { AddDashPipe } from './pipes/add-dash.pipe';
import { ForumComponent } from './components/forum/forum.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterAndLoginComponent } from './components/register-and-login/register-and-login.component';
import { DonationComponent } from './components/donation/donation.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForumPopupComponent } from './components/forum-popup/forum-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    PokemonFormComponent,
    TypeComponent,
    TypeFormComponent,
    ItemComponent,
    ItemFormComponent,
    MovesComponent,
    MoveFormComponent,
    AbilityComponent,
    AbilityFormComponent,
    LocationAreaComponent,
    PokemonListComponent,
    LocationAreaDetailsComponent,
    TypeListComponent,
    ItemListComponent,
    AbilityListComponent,
    MoveListComponent,
    SortMovesPipe,
    SortByMethodPipe,
    SortEggMovesPipe,
    SortTMHMPipe,
    SortTutorPipe,
    EncounterSimulatorComponent,
    DamageSimulatorComponent,
    AddDashPipe,
    ForumComponent,
    PostsComponent,
    RegisterAndLoginComponent,
    DonationComponent,
    PaymentComponent,
    HomeComponent,
    LogoutComponent,
    ForumPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
