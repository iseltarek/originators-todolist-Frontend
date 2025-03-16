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
import { AntdModule } from '../../../shared/antD.module';
import { TodoStateService } from '../../../Core/services/services/todo.state.service';
import { Subscription } from 'rxjs';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent implements OnInit {
  today: Date = new Date();
  isModalOpen = false;
  modalSubscription!: Subscription;

  constructor(public modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.isModalVisible$.subscribe(
      (isOpen) => {
        this.isModalOpen = isOpen;
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
