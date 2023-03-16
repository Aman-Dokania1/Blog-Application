import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastTriggerService } from '../service/toast-trigger.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastService: ToastTriggerService,
    private router: Router
  ) {}

  signupForm!: FormGroup;
  fileToUpload!: File;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      image: new FormControl(null, Validators.required),
      password: new FormControl(null, [
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
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0 && event.target.files[0])
      this.fileToUpload = event.target.files[0];
    console.log(event.target);
    console.log(event.target.files);
    console.log(this.fileToUpload);
  }

  onSubmit() {
    localStorage.clear();
    console.log(this.signupForm.value);

    this.authService
      .signupV2(this.signupForm.value, this.fileToUpload)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.toastTrigger({
            severity: 'success',
            summary: 'Success',
            detail: 'User registered Successfully',
          });

          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          err = JSON.parse(err.error);
          console.log(err);
          console.log('Error message' + err.message);

          this.toastService.toastTrigger({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
          });
        },
      });

    // this.authService.signup(this.signupForm.value).subscribe({
    //   next: (res: string) => {
    //     console.log(res);
    //     this.toastService.toastTrigger({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: 'User registered Successfully',
    //     });

    //     this.router.navigate(['/login']);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     console.log(err.error);
    //     console.log(err.error.message);

    //     this.toastService.toastTrigger({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: err.error.message,
    //     });
    //   },
    // });
  }
}
