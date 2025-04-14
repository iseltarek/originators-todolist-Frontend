import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTaskComponent } from '../../components/tasks-container/create-task/create-task.component';
import { ModalService } from '../../services/modal.service';
import { AntdModule } from '../../modules/antd.module';
import { Subscription } from 'rxjs';
import { Note } from '../../models/note.model';
import { TaskDetailsComponent } from '../../components/tasks-container/task-details/task-details.component';
import { BoardComponent } from './board/board.component';
import { AuthService } from '../../services/auth.service.component';

@Component({
  selector: 'app-home',
  imports: [
    CreateTaskComponent,
    CommonModule,
    SideNavComponent,
    DatePipe,
    AntdModule,
    TaskDetailsComponent,
    AntdModule,
    BoardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {
  onDateChange($event: Event) {
    throw new Error('Method not implemented.');
  }
  date: Date = new Date();
  isModalOpen = false;
  modalSubscription!: Subscription;
  isSelectedOpen = false;
  selectedTask: Note | null = null;
  private taskSubscription!: Subscription;
  isCollapsed = false;

  constructor(
    public modalService: ModalService,
    public authenticationService: AuthService
  ) {}

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
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  closeTaskModal() {
    this.modalService.closeModal();
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }
  logout() {
    this.authenticationService.logout();
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
