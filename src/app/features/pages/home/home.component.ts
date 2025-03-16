import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SideNavComponent } from '../../layout/side-nav/side-nav.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTaskComponent } from '../../todo/create-task/create-task.component';
import { ModalService } from '../../../shared/modal.service';
import { MaterialssModule } from '../../../shared/material.module';
import { AlltasksComponent } from '../../todo/alltasks/alltasks.component';
import { TodoStateService } from '../../../Core/services/services/todo.state.service';

@Component({
  selector: 'app-home',
  imports: [
    CreateTaskComponent,
    CommonModule,
    MaterialssModule,
    AlltasksComponent,
    SideNavComponent,
    DatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  today: Date = new Date();
  isModalOpen = false;
  @ViewChild('createTaskModal', { static: false }) createTaskModal!: ElementRef;
  constructor(
    public modalService: ModalService,
    public todoStateService: TodoStateService
  ) {}

  ngOnInit() {
    this.modalService.isModalOpen$.subscribe((isopen) => {
      this.isModalOpen = isopen;
    });
  }

  createTask() {
    this.modalService.openModal();
  }

  closeTaskModal() {
    this.modalService.closeModal();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.isModalOpen && this.createTaskModal) {
      const modalElement = this.createTaskModal.nativeElement;
      if (!modalElement.contains(event.target as Node)) {
        this.closeTaskModal();
        this.todoStateService.taskToUpdate.next(null);
      }
    }
  }
}
