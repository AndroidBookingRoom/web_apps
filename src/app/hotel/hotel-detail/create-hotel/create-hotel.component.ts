import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalDismissReasons, NgbActiveModal, NgbDateParserFormatter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelService} from "../../hotel.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

// import {log} from "util";

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateHotelComponent implements OnInit {
  isSaved: boolean = false;
  images: File[] = [];
  // @ts-ignore
  hotelForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }


  closeResult = '';


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private service: HotelService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private modal: NgbActiveModal,
  ) {
  }

  // open(content:any) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  get f() {
    return this.hotelForm.controls;
  }

  initForm() {
    this.hotelForm = this.fb.group({
      name: [null, Validators.required],
      address: [null],
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
    this.hotelForm.patchValue({
      multipartFile: this.images
    })
    this.spinner.show();
    this.service.addHotel(this.hotelForm.value).subscribe(res => {
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
    console.log(this.hotelForm.value)
  }

  processRemove(event: any) {
    const index = this.images.indexOf(event.file);
    this.images.splice(index, 1);
  }

}
