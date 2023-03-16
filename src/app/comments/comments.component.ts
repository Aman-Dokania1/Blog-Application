import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentResponse } from '../modals/post-response';
import { HomeService } from '../service/home.service';
import { ToastTriggerService } from '../service/toast-trigger.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
})
export class CommentsComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private toastSerivce: ToastTriggerService
  ) {}

  commentForm!: FormGroup;
  @Input() data!: CommentResponse[];
  @Input() postId!: Number;

  ngOnInit() {
    this.commentForm = new FormGroup({
      msg: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    console.log(this.commentForm.value);
    this.homeService
      .createComment(this.postId, { body: this.commentForm.value.msg })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data.push(res);
          console.log(this.data);
          this.toastSerivce.toastTrigger({
            severity: 'success',
            summary: 'Success',
            detail: 'Comment Send Successfully',
          });
        },
        error: (err) => {
          console.log(err);
          this.toastSerivce.toastTrigger({
            severity: 'error',
            summary: 'Failure',
            detail: err.error.message,
          });
        },
      });
  }
}
