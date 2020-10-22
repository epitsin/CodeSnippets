import { Component, Input } from '@angular/core';
import { CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.scss']
})
export class TagsCloudComponent {
  @Input()
  public data: { text: string, weight: number, link?: string }[];

  public options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };
}
