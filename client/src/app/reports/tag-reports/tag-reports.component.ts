import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

import { ReportService } from '../../core/services/report.service';

@Component({
  selector: 'app-tag-reports',
  templateUrl: './tag-reports.component.html',
  styleUrls: ['./tag-reports.component.scss'],
})
export class TagReportsComponent implements OnInit {
  public chartType: string = 'bar';

  public chartLabels: string[];

  public chartData: { data: number[]; label: string; }[];

  public cloudData: { text: string, weight: number, link?: string }[];

  private likesCloudData: { text: string, weight: number, link?: string }[];

  private snippetsCloudData: { text: string, weight: number, link?: string }[];

  constructor(private reportService: ReportService) { }

  async ngOnInit(): Promise<void> {
    this.reportService.getLikesReport().subscribe((data) => {
      this.likesCloudData = data.map((d) => ({ text: `${d.name}(${d.count})`, weight: d.size + 1 }));
      this.cloudData = this.likesCloudData;
    });
    this.reportService.getSnippetsReport().subscribe((data) => {
      this.chartLabels = data.map((d) => d.name);
      this.chartData = [{ data: data.map((d) => d.size), label: 'Likes' }];
      this.snippetsCloudData = data.map((d) => ({ text: `${d.name}(${d.count})`, weight: d.size + 1 }));
    });
  }

  public cloudRadioChange($event: MatRadioChange): void {
    if ($event.value === 'likes') {
      this.cloudData = this.likesCloudData;
      return;
    }

    this.cloudData = this.snippetsCloudData;
  }

  public chartRadioChange($event: MatRadioChange): void {
    this.chartType = $event.value;
  }
}
