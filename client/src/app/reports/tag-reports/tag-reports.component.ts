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
    const likesData = await this.reportService.getLikesReport();
    this.likesCloudData = likesData.map((d) => ({ text: `${d.name}(${d.count})`, weight: d.size }));
    this.cloudData = this.likesCloudData;

    const snippetsData = await this.reportService.getSnippetsReport();
    this.chartLabels = snippetsData.map((d) => d.name);
    this.chartData = [{ data: snippetsData.map((d) => d.size), label: 'Likes' }];
    this.snippetsCloudData = snippetsData.map((d) => ({ text: `${d.name}(${d.count})`, weight: d.size }));
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
