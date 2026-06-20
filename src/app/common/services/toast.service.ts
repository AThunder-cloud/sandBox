import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(detail:string,summary:string= 'Success') {
    this.messageService.add({ severity: 'success', summary:summary, detail: detail,});
  }

  showInfo(detail:string,summary:string= 'Info') {
    this.messageService.add({ severity: 'info', summary: summary, detail: detail });
  }

  showWarn(detail:string,summary:string= 'Warn') {
    this.messageService.add({ severity: 'warn', summary: summary, detail: detail });
  }

  showError(detail:string,summary:string= 'Error') {
    this.messageService.add({ severity: 'error', summary: summary, detail: detail });
  }

  clear() {
    this.messageService.clear();
  }

}
