import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialSharedModule } from '@shared/modules';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [MaterialSharedModule, NgStyle, NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() icon = 'Activity';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() dimension?: number;
  @Input() color?: string;

  colorClass?: string;

  ngOnInit(): void {
    this.colorClass = `app-icon--${this.color}`;
  }
}
