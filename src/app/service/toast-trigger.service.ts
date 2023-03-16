import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastTriggerService {
  constructor(private messageSerivce: MessageService) {}

  toastTrigger(value: any) {
    this.messageSerivce.add(value);
  }
}
