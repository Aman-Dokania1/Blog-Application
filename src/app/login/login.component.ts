import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserResponse } from '../modals/user-response';
import { AuthService } from '../service/auth.service';
import { ToastTriggerService } from '../service/toast-trigger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastTrigger: ToastTriggerService
  ) {}
  loginForm!: FormGroup;
  errorMessage!: string;
  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: UserResponse) => {
        console.log(res);
        this.authService.saveToken(res.accessToken);
        this.router.navigate(['/']);
        this.toastTrigger.toastTrigger({
          severity: 'success',
          summary: 'Success',
          detail: 'User login Successfully',
        });
      },
      error: (err) => {
        console.log('Iside error block');
        console.log(err);
        this.toastTrigger.toastTrigger({
          severity: 'error',
          summary: 'Error',
          detail: 'Bad Credentials',
        });
      },
    });
  }
}
