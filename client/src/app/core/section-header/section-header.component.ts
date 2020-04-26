import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent implements OnInit {
  // obserable gets a $
  breadcrumb$: Observable<any[]>;

  constructor(private bcService: BreadcrumbService) { }

  ngOnInit(): void {
    // video 127
    // http calls are finite so they will close after the call
    // Thats why we don't need to unsubscripe them
    // Promises are not subscriptions!
    //  OnDestory is also a solution
    this.breadcrumb$ = this.bcService.breadcrumbs$;
  }

}
