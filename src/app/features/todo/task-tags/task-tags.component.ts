import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { AntdModule } from '../../../shared/antD.module';

@Component({
  selector: 'app-task-tags',
  imports: [MaterialssModule, CommonModule, MatInputModule, AntdModule],
  templateUrl: './task-tags.component.html',
  styleUrl: './task-tags.component.css',
})
export class TaskTagsComponent {
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() tags: string[] = [];
  @Output() tagsUpdated = new EventEmitter<string[]>();
  errorMessage = '';

  add(event: MatChipInputEvent): void {
    if (this.tags.length >= 3) {
      this.errorMessage = 'only 3 tags are allowed';
      return;
    }
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value);
    }
    if (input) input.value = '';

    this.tagsUpdated.emit([...this.tags]);
  }
  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) this.tags.splice(index, 1);
    this.tagsUpdated.emit([...this.tags]);
  }
}
