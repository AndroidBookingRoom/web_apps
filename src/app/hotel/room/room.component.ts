import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DeleteRoomComponent} from "../kind-of-room/delete-kor/delete-room.component";
import {ActionDeleteRoomComponent} from "./action-delete-room/action-delete-room.component";
import {CreateRoomComponent} from "../kind-of-room/create-kor/create-room.component";
import {ActionCreateRoomComponent} from "./action-create-room/action-create-room.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
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

  delete(guid: any) {
    const modalRef = this.modalService.open(ActionDeleteRoomComponent, {
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
    const modalRef = this.modalService.open(ActionCreateRoomComponent, {
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

}
