import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HotelService} from "../../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  isSaved: boolean = false;
  images: File[] = [];
  // @ts-ignore
  roomForm: FormGroup;
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
    this.initForm()
  }

  get f() {
    return this.roomForm.controls;
  }

  initForm() {
    this.roomForm = this.fb.group({
      name: [null, Validators.required],
      multipartFile: [''],
    })
  }

  // @ts-ignore


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
    })
  }

  processRemove(event: any) {
    const index = this.images.indexOf(event.file);
    this.images.splice(index, 1);
  }
}
