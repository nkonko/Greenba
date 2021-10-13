import { Component, OnInit } from '@angular/core';
import { ILog } from '../../../shared/models/log';
import { LogService } from '../log.service';
import { LogParams } from '../../../shared/models/logParams';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logForm: FormGroup;

  logs: ILog[];
  logParams: LogParams;
  levelOptions = [
    {name: 'Baja a alta', value: 'levelDesc'},
    {name: 'Alta a baja', value: 'levelAsc'}
  ]

  individualLevelOptions = [
    {name: 'Baja', value: 'info'},
    {name: 'Media', value: 'warning'},
    {name: 'Alta', value: 'error'}
  ]
  
  constructor(private logService: LogService, private fb: FormBuilder) { 
    this.logParams = this.logService.getLogParams();
  }

  ngOnInit(): void {
    this.getLogs();
    this.createForm();
  }

  getLogs() {
    this.logService.getLogsForUser().subscribe((response) => {
      this.logs = response.data;
    }, error => {
      console.log(error);
    });
  }

  onSortSelected(sort: string) {
    const params = this.logService.getLogParams();
    params.sort = sort;
    this.logService.setLogParams(params);
    this.getLogs();
  }

  onPageChanged(pageNumber: number) {
    const params = this.logService.getLogParams();
    if (params.pageNumber !== pageNumber){
      params.pageNumber = pageNumber;
      this.logService.getLogParams();
      this.getLogs();
  }
}

createForm() {
this.logForm = this.fb.group({
  date:[null, Validators.required]
})
}

}
