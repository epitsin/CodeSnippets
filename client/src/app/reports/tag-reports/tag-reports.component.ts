import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { TagService } from '../../core/services/tag.service';

@Component({
  selector: 'app-tag-reports',
  templateUrl: './tag-reports.component.html',
  styleUrls: ['./tag-reports.component.scss']
})
export class TagReportsComponent implements OnInit {
  public chartType: string = "bar";
  public chartLabels: string[];
  public chartData: { data: number[]; label: string; }[];
  public cloudData: { text: string, weight: number, link?: string }[];
  public cloudOptions: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  private likesCloudData: { text: string, weight: number, link?: string }[];
  private snippetsCloudData: { text: string, weight: number, link?: string }[];

  constructor(private tagService: TagService) { }

  async ngOnInit(): Promise<void> {
    this.tagService.getLikesReport().subscribe(data => {
      this.chartLabels = data.map(d => d.name);
      this.chartData = [{ data: data.map(d => d.count), label: 'Likes' }];
      this.cloudData = this.likesCloudData = data.map(d => {
        return { text: `${d.name}(${d.count})`, weight: d.size + 1 };
      });
    });
    this.tagService.getSnippetsReport().subscribe(data => {
      this.snippetsCloudData = data.map(d => {
        return { text: `${d.name}(${d.count})`, weight: d.size + 1 };
      });
    });
  }

  public cloudRadioChange($event: MatRadioChange): void {
    if ($event.value === "likes") {
      this.cloudData = this.likesCloudData;
      return;
    }

    this.cloudData = this.snippetsCloudData;
  }

  public chartRadioChange($event: MatRadioChange): void {
    this.chartType = $event.value;
  }
}
