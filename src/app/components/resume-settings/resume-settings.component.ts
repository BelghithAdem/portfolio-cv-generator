import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './resume-settings.component.html',
})
export class ResumeSettingsComponent {
  @Input() themeColorValue: string | undefined;
  @Input() fontFamilyValue: string | undefined;
  @Input() fontSize: number | undefined;
  
  @Output() themeColorChange = new EventEmitter<string>();
  @Output() fontFamilyChange = new EventEmitter<string>();
  @Output() fontSizeChange = new EventEmitter<number>();
  
  themeArray = [
    { color: '#3b82f6' }, // blue-500
    { color: '#ef4444' }, // red-500
    { color: '#10b981' }, // emerald-500
    { color: '#f59e0b' }, // amber-500
    { color: '#8b5cf6' }, // violet-500
    { color: '#ec4899' }  // pink-500
  ];
  
  fontArray = [
    { name: 'Inter' },
    { name: 'Roboto' },
    { name: 'Open Sans' },
    { name: 'Lato' },
    { name: 'Montserrat' }
  ];

  themeColor(color: string) {
    this.themeColorChange.emit(color);
  }

  fontFamily(font: string) {
    this.fontFamilyChange.emit(font);
  }

  fontValue(event: any) {
    this.fontSizeChange.emit(event.target.value);
  }

  increaseSize(size: number) {
    this.fontSizeChange.emit(size);
  }
}
