import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-action-create-room',
  templateUrl: './action-create-room.component.html',
  styleUrls: ['./action-create-room.component.scss']
})
export class ActionCreateRoomComponent implements OnInit {
  isSaved: boolean = false;
  images: File[] = [];

  ListHotel: any[] = [];
  ListKOR: any[] = []
  // @ts-ignore
  roomForm: FormGroup;
data:any;
  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private service: HotelService,
              private spinner: NgxSpinnerService,
              private toast: ToastrService,
              private modal: NgbActiveModal,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getListHotel();
    this.getListKOR()
  }

  getListHotel() {
    this.service.getListHotel().subscribe(res => {
      this.ListHotel = res.data;
      console.log(this.ListHotel);
    })
  }

  getListKOR() {
    this.service.getListKOR().subscribe(res => {
      this.ListKOR = res.data;
      console.log(this.ListKOR)
    })
  }

  initForm() {
    this.roomForm = this.fb.group({
      guidHotel: [null, Validators.required],
      guidKindOfRoom: [null, Validators.required],
      price: [''],
      multipartFile: [''],
    })
  }

  get f() {
    return this.roomForm.controls;
  }

  processClear() {
    this.images = [];
  }


  onSelect(event: any) {
    for (const item of event.files) {
      this.images.push(item)
    }
  }

  close() {
    this.modal.close();
  }

  processRemove(event: any) {
    const index = this.images.indexOf(event.file);
    this.images.splice(index, 1);
  }

  submit() {
    // let dataToCreateHotel = this.convertToCreateHotel();
    this.roomForm.patchValue({
      multipartFile: this.images
    })
    this.spinner.show();
    this.service.createRoom(this.roomForm.value).subscribe(res => {
      if (res.code == "success") {
        this.spinner.hide();
        this.toast.success(res.code)
        this.close();
      } else {
        this.spinner.hide();
        this.toast.error(res.code)
        this.close();
      }
      console.log(this.roomForm.value)
    })
  }
}

