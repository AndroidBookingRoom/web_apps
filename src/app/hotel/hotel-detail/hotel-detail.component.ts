import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CreateHotelComponent} from "./create-hotel/create-hotel.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";
import {DeleteHotelComponent} from "./delete-hotel/delete-hotel/delete-hotel.component";

// import {CreateHotelDetailComponent} from "./create-hotel-detail/create-hotel-detail.component";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  providers: [DatePipe]
})
export class HotelDetailComponent implements OnInit {
  hotelGuid: any;

  constructor(
    private modalService: NgbModal,
    private hotelService: HotelService,
    private spinner: NgxSpinnerService
  ) {
  }

  ListHotel: any[] = [];

  ngOnInit(): void {
    this.getListHotel();
  }

  getListHotel() {
    this.spinner.show();
    this.hotelService.getListHotel().subscribe(res => {
      if (res.code == "success") {
        this.spinner.hide();
        this.ListHotel = res.data;
        // this.hotelGuid = res.data.guid;
        console.log(this.ListHotel)
      }
    })
  }

  delete(guid: any) {
    const modalRef = this.modalService.open(DeleteHotelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.delHotelGuid = guid;
    modalRef.result.then((result) => {
      this.getListHotel();
    }, (reason) => {
    });

  }

  add() {
    const modalRef = this.modalService.open(CreateHotelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
    });
    modalRef.result.then((result) => {
      this.getListHotel();
    }, (reason) => {
    });
  }

}
