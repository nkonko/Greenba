import { Component, OnInit } from '@angular/core';
import { ILog } from '../../../shared/models/log';
import { LogService } from '../log.service';
import { LogParams } from '../../../shared/models/logParams';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js'
import { ChartData } from '../../../shared/models/chartData';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  
  chartData: ChartData = new ChartData;
  chart: any;
  logForm: FormGroup;
  totalCount: number;
  logs: ILog[];
  logParams: LogParams;
  totalErrors: number;

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
    Chart.register(...registerables);
    this.logParams = this.logService.getLogParams();
  }

  ngOnInit(): void {
    this.getErrorsCount();
    this.getLogs();
    this.createForm();
   this.getChart();
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
  
   getErrorsCount() {
     const params = this.logService.getLogParams();
     params.level = 'Error';

     this.logService.setLogParams(params);
    this.logService.getLogsByParams().subscribe((response)=> {
       this.totalErrors = response.count;
     });
   }
  
   getChart() {
     
    this.logService.getChartData().subscribe(res => {
       this.chartData.dates = res.dates;
       this.chartData.errorCount = res.errorCount;
     });

    this.chart = new Chart('chart2', {
      type: 'line',
      data: {
        labels:  this.chartData.dates,
        datasets: [
          {
            label: 'Errores en dias',
            data:  this.chartData.errorCount,
            borderWidth: 3,
            fill : true,
            backgroundColor : 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ]
      }
    });
   }
}
