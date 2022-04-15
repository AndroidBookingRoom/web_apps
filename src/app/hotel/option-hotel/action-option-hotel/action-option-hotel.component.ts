import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-action-option-hotel',
  templateUrl: './action-option-hotel.component.html',
  styleUrls: ['./action-option-hotel.component.scss']
})
export class ActionOptionHotelComponent implements OnInit {
  ListHotel: any[] = [];
  // @ts-ignore
  optionHotelForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private service: HotelService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private modal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.getListHotel();
    this.initForm();
  }

  initForm() {
    this.optionHotelForm = this.fb.group({
      guidHotel: [null, Validators.required],
      optionName: [null, Validators.required]
    })
  }
  close() {
    this.modal.close();
  }
  get f() {
    return this.optionHotelForm.controls;
  }
  getListHotel() {
    this.service.getListHotel().subscribe(res => {
      this.ListHotel = res.data;
      console.log(this.ListHotel);
    })
  }
  submit() {
    // let dataToCreateHotel = this.convertToCreateHotel();
    this.spinner.show();
    this.service.createOptionHotel(this.optionHotelForm.value).subscribe(res => {
      if (res.code == "success") {
        this.spinner.hide();
        this.toast.success(res.code)
        this.close();
      } else {
        this.spinner.hide();
        this.toast.error(res.code)
        this.close();
      }
    })
  }
}
