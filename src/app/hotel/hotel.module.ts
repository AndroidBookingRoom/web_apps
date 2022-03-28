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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateHotelComponent} from './hotel-detail/create-hotel/create-hotel.component';
import {NgbActiveModal, NgbButtonsModule, NgbDatepickerModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerModule} from "ngx-spinner";
import { DeleteHotelComponent } from './hotel-detail/delete-hotel/delete-hotel/delete-hotel.component';
import {FileUploadModule} from "primeng/fileupload";
import {ButtonModule} from "primeng/button";


const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
    children: [
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
    DeleteHotelComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbDatepickerModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    NgbButtonsModule,
    ButtonModule,


    // NgbModalModule,
    // NgbAc
  ],
})
export class HotelModule {
}
