import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isModalVisibleSubject = new BehaviorSubject<boolean>(false);
  isModalVisible$ = this.isModalVisibleSubject.asObservable();

  private isEditingSubject = new BehaviorSubject<boolean>(false);
  isEditing$ = this.isEditingSubject.asObservable();

  private selectedTaskSubject = new BehaviorSubject<Note | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();

  openSelectedTaskModal(task: Note | null) {
    this.selectedTaskSubject.next(task);
  }

  closeSelectedTaskModal() {
    this.selectedTaskSubject.next(null);
  }
  openModal(editing: boolean = false) {
    this.isEditingSubject.next(editing);
    this.isModalVisibleSubject.next(true);
  }

  closeModal() {
    this.isModalVisibleSubject.next(false);
  }
  resetSelectedTask() {
    this.isModalVisibleSubject.next(false);
    this.selectedTaskSubject.next(null);
  }
}
