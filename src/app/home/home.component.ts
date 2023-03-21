import { Component, OnInit } from '@angular/core';
import { Content, PostResponse } from '../modals/post-response';
import { HomeService } from '../service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}

  responseData!: PostResponse[];
  pageNo: number = 0;

  ngOnInit() {
    // this.homeService.getAllPost().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.responseData = res.content;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    this.homeService.getPostByPageNumber(this.pageNo).subscribe({
      next: (res) => {
        console.log(res);
        this.responseData = res.content;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onScroll() {
    console.log('scrolled called');
    this.homeService.getPostByPageNumber(++this.pageNo).subscribe({
      next: (res) => {
        console.log(res);
        if (res.content) this.responseData.push(...res.content);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
