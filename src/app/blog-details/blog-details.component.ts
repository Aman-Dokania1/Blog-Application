import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostResponse } from '../modals/post-response';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private homeService: HomeService,
    private currentRoute: ActivatedRoute
  ) {}

  response: PostResponse = {} as PostResponse;
  postId!: Number;
  routeSubs!: Subscription;

  ngOnInit() {
    this.routeSubs = this.currentRoute.params.subscribe({
      next: (res) => {
        console.log(res);
        this.postId = res['id'];

        this.homeService.getPostById(this.postId).subscribe({
          next: (res) => {
            console.log(res);
            this.response = res;
          },
          error: (err) => {
            console.log('Inside error');
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSubs.unsubscribe();
  }
}
