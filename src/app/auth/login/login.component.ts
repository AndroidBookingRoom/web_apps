import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {ToastrService} from "ngx-toastr";
import {User} from "./user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(
    private route: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private loginService: LoginService
  ) {
  }

  loginForm: FormGroup = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  })
  username: any;
  password: any;

  ngOnInit(): void {
  }

  convertForm() {
    let object: any = new Object({
      username: this.username.value,
      password: this.password.value
    })
    return object;
  }

  Submit() {
    // let form = this.convertForm();
    // const data = JSON.stringify(this.loginForm.value);
    this.loginService.authenticateUser(this.loginForm).subscribe(res => {
      if (res.code == "success") {
        this.route.navigate(['/hotel']);
        this.toastr.success('Success!', 'Login Success!')
      } else {
        this.toastr.error('Failed!', 'Login Failed!')
      }
    })

  }

  get f() {
    return this.loginForm.controls;
  }

}
