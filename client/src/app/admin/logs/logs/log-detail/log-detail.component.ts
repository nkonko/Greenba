import { Component, OnInit } from '@angular/core';
import { LogService } from '../../log.service';
import { ActivatedRoute } from '@angular/router';
import { ILog } from '../../../../shared/models/log';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss']
})
export class LogDetailComponent implements OnInit {
  log: ILog;

  constructor(
    private logService: LogService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadLog();
  }

  loadLog() {
    this.logService
      .getLogDetailed(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (log) => {
          this.log = log;
        },
        (error) => console.log(error)
      );
  }

}
