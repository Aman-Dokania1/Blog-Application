import { Component, OnInit } from '@angular/core';
import { PostResponse } from '../modals/post-response';
import { HomeService } from '../service/home.service';
import { ToastTriggerService } from '../service/toast-trigger.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  constructor(
    private homeService: HomeService,
    private toggleService: ToastTriggerService
  ) {}

  response: PostResponse[] = [];
  ngOnInit() {
    this.homeService.myblogPost().subscribe({
      next: (res: PostResponse[]) => {
        console.log(res);
        this.response = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePost(id: Number, idx: number) {
    this.homeService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        this.response.splice(idx, 1);
        this.toggleService.toastTrigger({
          severity: 'success',
          summary: 'Success',
          detail: 'Post deleted Successfully',
        });
      },
      error: (err) => {
        console.log(err);
        this.toggleService.toastTrigger({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        });
      },
    });
  }
}
