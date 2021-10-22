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
  totalCount: number;
  logs: ILog[];
  logParams: LogParams;

  timeOptions = [
    { name: 'Mas nuevos', value: 'Newest' },
    { name: 'Mas viejos', value: 'Oldest' }
  ]

  levelOptions = [
    { name: 'Alta', value: 'Error' },
    { name: 'Media', value: 'Warn' },
    { name: 'Baja', value: 'Info' }
  ]

  constructor(private logService: LogService, private fb: FormBuilder) {
    this.logParams = this.logService.getLogParams();
  }

  ngOnInit(): void {
    this.getLogs();
    this.createForm();
  }

  getLogs() {
    this.logService.getLogsByParams().subscribe((response) => {

      this.logs = response.data;
      this.totalCount = response.count;

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
    if (params.pageNumber !== pageNumber) {
      params.pageNumber = pageNumber;
      this.logService.getLogParams();
      this.getLogs();
    }
  }

  createForm() {
    this.logForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }

  onLevelSelected(level: string) {
    const params = this.logService.getLogParams();
    params.level = level;
    this.logService.setLogParams(params);
    this.getLogs();
  }

  filter() {
    
    if (this.logForm.controls.dateFrom.value || this.logForm.controls.dateTo.value){
      
      const params = this.logService.getLogParams();
      params.dateFrom = this.logForm.controls.dateFrom.value;
      params.dateTo = this.logForm.controls.dateTo.value;

      this.logService.setLogParams(params);
      this.logService.getLogsByParams().subscribe((response)=> {

        this.logs = response.data;
        this.totalCount = response.count;
      }, error => {
        console.log(error);
      });
    }
  }

}
