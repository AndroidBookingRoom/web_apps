import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HotelDetailComponent} from './hotel-detail/hotel-detail.component';
import {KindOfRoomComponent} from './kind-of-room/kind-of-room.component';
import {OptionHotelComponent} from './option-hotel/option-hotel.component';
import {RoomComponent} from './room/room.component';
import {HomeComponent} from './home/home.component';
import {HotelComponent} from "./hotel.component";
// import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import { CreateHotelComponent } from './hotel-detail/create-hotel/create-hotel.component';
import {NgbActiveModal, NgbDatepickerModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";


const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
    children:[
      {
        path: 'hotel-detail',
        component: HotelDetailComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'kind-of-room',
        component: KindOfRoomComponent
      }, {
        path: 'option-hotel',
        component: OptionHotelComponent
      }, {
        path: 'room',
        component: RoomComponent
      },

    ]
  }
]

@NgModule({
  declarations: [
    HotelDetailComponent,
    KindOfRoomComponent,
    OptionHotelComponent,
    RoomComponent,
    HomeComponent,
    CreateHotelComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    // NgbModalModule,
    // NgbAc
  ],
})
export class HotelModule {
}
