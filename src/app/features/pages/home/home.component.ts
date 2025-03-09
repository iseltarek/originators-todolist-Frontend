import { Component, OnInit } from '@angular/core';
import { MaterialssModule } from '../../../shared/material.module';
import { SideNavComponent } from '../../layout/side-nav/side-nav.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AlltasksComponent } from '../../todo/alltasks/alltasks.component';
import { CreateTaskComponent } from '../../todo/create-task/create-task.component';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'app-home',
  imports: [
    MaterialssModule,
    SideNavComponent,
    DatePipe,
    AlltasksComponent,
    CreateTaskComponent,
    CommonModule,
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
