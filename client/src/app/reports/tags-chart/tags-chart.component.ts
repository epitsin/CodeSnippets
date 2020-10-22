import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags-chart',
  templateUrl: './tags-chart.component.html',
  styleUrls: ['./tags-chart.component.scss']
})
export class TagsChartComponent {
  @Input()
  public labels: string[];

  @Input()
  public data: { data: number[]; label: string; }[];

  @Input()
  public chartType: string;

  public chartOptions = { scaleShowVerticalLines: false, responsive: true };
  public chartLegend = true;
}
