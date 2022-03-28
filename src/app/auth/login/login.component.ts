import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {ToastrService} from "ngx-toastr";
import {User} from "./user";
import {NgxSpinnerService} from "ngx-spinner";
import {TokenService} from "../../config/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  // @ts-ignore
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(
    private route: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private tokenService: TokenService
  ) {
  }


  // username: any;
  // password: any;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }


  Submit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.spinner.show();
      // let form = this.convertForm();
      // const data = JSON.stringify(this.loginForm.value);
      this.loginService.authenticateUser(this.loginForm.value).subscribe(res => {
        if (res.code == "success") {
          this.spinner.hide();
          this.tokenService.setToken(res.data.TOKEN);
          this.route.navigate(['/hotel']);
          this.toastr.success('Success!', 'Login Success!')
        } else {
          this.spinner.hide();
          this.toastr.error('Failed!', 'Login Failed!')
        }
      })
    }
  }

  get f() {
    return this.loginForm.controls;
  }

}
