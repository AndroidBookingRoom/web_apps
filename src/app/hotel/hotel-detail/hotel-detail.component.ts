import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CreateHotelComponent} from "./create-hotel/create-hotel.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

// import {CreateHotelDetailComponent} from "./create-hotel-detail/create-hotel-detail.component";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit()
    :
    void {
  }

  add() {
    this.modalService.open(CreateHotelComponent, {backdropClass: 'light-blue-backdrop'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // @ts-ignore
    // this.modalService.open(CreateHotelComponent).result.then(data => {
    //   console.log(data);
    // })
  }

}
