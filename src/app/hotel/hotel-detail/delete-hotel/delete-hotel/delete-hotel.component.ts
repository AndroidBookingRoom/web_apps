import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../../../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-hotel',
  templateUrl: './delete-hotel.component.html',
  styleUrls: ['./delete-hotel.component.scss']
})
export class DeleteHotelComponent implements OnInit {
  @Input() delHotelGuid: any;

  constructor(
    private modal: NgbActiveModal,
    private service: HotelService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  close() {
    this.modal.close();
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteHotel(this.delHotelGuid).subscribe(res => {
      if (res.code === 'success') {
        this.spinner.hide();
        this.toastr.success(
          "Success",);
        this.modal.close('success');
      } else {
        this.spinner.hide();
        this.toastr.error(res.code);
        this.modal.close('fail');
      }
    });
  }

}
