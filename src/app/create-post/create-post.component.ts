import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownItemInterface } from '../modals/dropdown-item-interface';
import { HomeService } from '../service/home.service';
import { ToastTriggerService } from '../service/toast-trigger.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private toastService: ToastTriggerService,
    private router: Router
  ) {}

  createPost!: FormGroup;

  categories!: DropdownItemInterface[];
  fileToUpload!: File;

  ngOnInit(): void {
    this.categories = [
      { label: 'Select Category', value: 0, inactive: true },
      { label: 'Java', value: 1 },
      { label: 'C++', value: 2 },
      { label: 'C', value: 3 },
      { label: 'PHP', value: 4 },
      { label: 'C#', value: 5 },
    ];

    this.createPost = new FormGroup({
      title: new FormControl(null, [Validators.minLength(2)]),
      description: new FormControl(null, [Validators.minLength(10)]),
      image: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
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
    console.log(this.createPost.value);
    this.homeService
      .createPost(this.createPost.value, this.fileToUpload)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.toastTrigger({
            severity: 'success',
            summary: 'Success',
            detail: 'Post Created Successfully',
          });
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          console.log(err.error);
          console.log(err.error.message);
          console.log('Inside Error');
          this.toastService.toastTrigger({
            severity: 'error',
            summary: 'Failure',
            detail: err.error.message,
          });
        },
      });
  }
}
