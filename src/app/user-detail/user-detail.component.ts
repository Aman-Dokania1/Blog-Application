import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDetails } from '../modals/user-response';
import { AuthService } from '../service/auth.service';
import { ToastTriggerService } from '../service/toast-trigger.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toggleService: ToastTriggerService,
    private dom: DomSanitizer
  ) {}

  response: UserDetails = {} as UserDetails;
  udpateDetails!: FormGroup;
  flagPassword = false;
  image: any;

  ngOnInit() {
    this.udpateDetails = new FormGroup({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),

      confirm_password: new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
    });

    this.authService.userDetails().subscribe({
      next: (res) => {
        console.log(res);
        this.response = res;
        // console.log(url);
        // console.log(JSON.stringify(res.profileImage));
        // console.log(res.profileImage);

        // this.image = JSON.stringify(url);

        console.log(res.profileImage);
      },
      error: (err) => {
        console.log(err);
        //err = JSON.parse(err.error);
        err = this.toggleService.toastTrigger({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
        });
      },
    });
  }

  changePassword() {
    this.flagPassword = !this.flagPassword;
  }

  onSubmit() {
    console.log(this.udpateDetails.value);
    this.authService.changePassword(this.udpateDetails.value).subscribe({
      next: (res) => {
        console.log(res);
        this.udpateDetails.reset();
        this.flagPassword = false;
        this.toggleService.toastTrigger({
          severity: 'success',
          summary: 'Success',
          detail: res,
        });
      },
      error: (err) => {
        console.log(err);
        err.error = JSON.parse(err.error);
        this.toggleService.toastTrigger({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      },
    });
  }

  sanatise(url: any) {
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }
}
