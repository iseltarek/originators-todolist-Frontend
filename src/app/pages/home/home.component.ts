import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  output,
  ViewChild,
} from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTaskComponent } from '../../components/tasks-container/create-task/create-task.component';
import { ModalService } from '../../services/modal.service';
import { MaterialssModule } from '../../modules/material.module';
import { AlltasksComponent } from '../../components/tasks-container/alltasks.component';
import { AntdModule } from '../../modules/antd.module';
import { TodoStateService } from '../../services/todo.state.service';
import { Subscription } from 'rxjs';
import { Note } from '../../models/note.model';
import { TaskDetailsComponent } from '../../components/tasks-container/task-details/task-details.component';

@Component({
  selector: 'app-home',
  imports: [
    CreateTaskComponent,
    CommonModule,
    MaterialssModule,
    AlltasksComponent,
    SideNavComponent,
    DatePipe,
    AntdModule,
    TaskDetailsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {
  today: Date = new Date();
  isModalOpen = false;
  modalSubscription!: Subscription;
  isSelectedOpen = false;
  selectedTask: Note | null = null;
  private taskSubscription!: Subscription;

  constructor(public modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.isModalVisible$.subscribe(
      (isOpen) => {
        this.isModalOpen = isOpen;
      }
    );

    this.taskSubscription = this.modalService.selectedTask$.subscribe(
      (taskDetailes) => {
        if (taskDetailes) {
          this.isSelectedOpen = true;
          this.selectedTask = taskDetailes;
        } else {
          this.isSelectedOpen = false;
        }
      }
    );
  }

  createTask() {
    this.modalService.openModal();
  }

  closeTaskModal() {
    this.modalService.closeModal();
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }

  @ViewChild('createTaskModal', { static: false }) createTaskModal!: ElementRef;
  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   if (this.isModalOpen && this.createTaskModal) {
  //     const modalElement = this.createTaskModal.nativeElement;
  //     if (!modalElement.contains(event.target as Node)) {
  //       this.closeTaskModal();
  //     }
  //   }
  // }
}
