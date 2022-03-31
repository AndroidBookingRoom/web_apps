import {Component, OnInit} from '@angular/core';
import {HotelService} from "../hotel.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerService} from "ngx-spinner";
import {DeleteHotelComponent} from "../hotel-detail/delete-hotel/delete-hotel/delete-hotel.component";
import {CreateHotelComponent} from "../hotel-detail/create-hotel/create-hotel.component";
import {CreateRoomComponent} from "./create-kor/create-room.component";
import {DeleteRoomComponent} from "./delete-kor/delete-room.component";

@Component({
  selector: 'app-kind-of-room',
  templateUrl: './kind-of-room.component.html',
  styleUrls: ['./kind-of-room.component.scss']
})
export class KindOfRoomComponent implements OnInit {
  ListRoom: any[] = [];

  constructor(
    private modalService: NgbModal,
    private hotelService: HotelService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.getListRoom();
  }

  getListRoom() {
    this.spinner.show();
    this.hotelService.getListRoom().subscribe(res => {
      if (res.code == "success") {
        console.log(res.data)
        this.spinner.hide();
        this.ListRoom = res.data;
        // this.hotelGuid = res.data.guid;
      }
    })
  }

  delete(guid: any) {
    const modalRef = this.modalService.open(DeleteRoomComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.delRoomGuid = guid;
    modalRef.result.then((result) => {
      this.getListRoom();
    }, (reason) => {
    });

  }

  add() {
    const modalRef = this.modalService.open(CreateRoomComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      centered: true,
    });
    modalRef.result.then((result) => {
      this.getListRoom();
    }, (reason) => {
    });
  }

}
