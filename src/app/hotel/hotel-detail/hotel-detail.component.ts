import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {CreateHotelComponent} from "./create-hotel/create-hotel.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {DatePipe} from "@angular/common";
import {DeleteHotelComponent} from "./delete-hotel/delete-hotel/delete-hotel.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Paginator} from "primeng/paginator";

// import {CreateHotelDetailComponent} from "./create-hotel-detail/create-hotel-detail.component";

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss'],
  providers: [DatePipe]
})
export class HotelDetailComponent implements OnInit {
  // @ts-ignore

  constructor(
    private modalService: NgbModal,
    private hotelService: HotelService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
  ) {
  }

  // @ts-ignore
  searchForm: FormGroup;
  searchText: any;
  @Input() ListHotel: any[] = [];

  ngOnInit(): void {
    this.searchListHotel();
    this.initForm();
  }

  // initForm() {
  //   this.hotelDetailForm = this.fb.group({
  //     name: [null],
  //   })
  // }

  get f() {
    return this.searchForm.controls
  }

  initForm() {
    this.searchForm = this.fb.group({
      name: ['']
    })
  }

  searchListHotel() {
    this.spinner.show();
    this.hotelService.getListHotel().subscribe(res => {
      if (res.code == "success") {
        console.log(res.data)
        this.spinner.hide();
        this.ListHotel = res.data;
        // this.hotelGuid = res.data.guid;
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
      this.searchListHotel();
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
      this.searchListHotel();
    }, (reason) => {
    });
  }

}
