import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-delete-option-hotel',
  templateUrl: './delete-option-hotel.component.html',
  styleUrls: ['./delete-option-hotel.component.scss']
})
export class DeleteOptionHotelComponent implements OnInit {
  @Input() delOptionHotelGuid: any;

  constructor(
    private modal: NgbActiveModal,
    private service: HotelService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  close() {
    this.modal.close();
  }

  processDelete() {
    this.spinner.show();
    this.service.deleteOptionHotel(this.delOptionHotelGuid).subscribe(res => {
      if (res.code === 'success') {
        this.spinner.hide();
        this.toastr.success(
          "Success",);
        this.modal.close('success');
      }
      else {
        this.spinner.hide();
        this.toastr.error(res.code);
        this.modal.close('fail');
      }
    });
  }

}
