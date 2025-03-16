import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isModalVisibleSubject = new BehaviorSubject<boolean>(false);
  isModalVisible$ = this.isModalVisibleSubject.asObservable();

  private isEditingSubject = new BehaviorSubject<boolean>(false);
  isEditing$ = this.isEditingSubject.asObservable();

  openModal(editing: boolean = false) {
    this.isEditingSubject.next(editing);
    this.isModalVisibleSubject.next(true);
  }

  closeModal() {
    this.isModalVisibleSubject.next(false);
  }
}
