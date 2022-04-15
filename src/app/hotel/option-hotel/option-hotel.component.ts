import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ActionCreateRoomComponent} from "../room/action-create-room/action-create-room.component";
import {ActionDeleteRoomComponent} from "../room/action-delete-room/action-delete-room.component";
import {ActionOptionHotelComponent} from "./action-option-hotel/action-option-hotel.component";
import {DeleteOptionHotelComponent} from "./delete-option-hotel/delete-option-hotel.component";

@Component({
  selector: 'app-option-hotel',
  templateUrl: './option-hotel.component.html',
  styleUrls: ['./option-hotel.component.scss']
})
export class OptionHotelComponent implements OnInit {
  ListOptionHotel: any[] = [];

  constructor(
    private modalService: NgbModal,
    private hotelService: HotelService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getListOptionHotel();
  }
  delete(guid: any) {
    const modalRef = this.modalService.open( DeleteOptionHotelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.delOptionHotelGuid = guid;
    modalRef.result.then((result) => {
      this.getListOptionHotel();
    }, (reason) => {
    });
  }
  add() {
    const modalRef = this.modalService.open(ActionOptionHotelComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
    });
    modalRef.result.then((result) => {
      this.getListOptionHotel();
    }, (reason) => {
    });
  }
  getListOptionHotel() {
    this.spinner.show();
    this.hotelService.getListOptionHotel().subscribe(res => {
      if (res.code == "success") {
        console.log(res.data)
        this.spinner.hide();
        this.ListOptionHotel = res.data;
        // this.hotelGuid = res.data.guid;
      }
    })
  }

}
