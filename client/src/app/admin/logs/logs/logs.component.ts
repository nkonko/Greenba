import { Component, OnInit } from '@angular/core';
import { ILog } from '../../../shared/models/log';
import { LogService } from '../log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: ILog[];
  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.logService.getLogsForUser().subscribe((logs: ILog[]) => {
      this.logs = logs;
    }, error => {
      console.log(error);
    });
  }

}
