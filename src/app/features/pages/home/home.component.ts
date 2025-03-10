import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../../layout/side-nav/side-nav.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTaskComponent } from '../../todo/create-task/create-task.component';
import { ModalService } from '../../../shared/modal.service';
import { MaterialssModule } from '../../../shared/material.module';
import { AlltasksComponent } from '../../todo/alltasks/alltasks.component';

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
  constructor(public modalService: ModalService) {}

  ngOnInit() {
    this.modalService.isModalOpen$.subscribe((isopen) => {
      this.isModalOpen = isopen;
    });
  }

  crateTask() {
    this.modalService.openModal();
  }
  closeTaskModal() {
    this.modalService.closeModal();
  }
}
