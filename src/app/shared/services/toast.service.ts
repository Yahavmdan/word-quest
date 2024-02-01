import { Injectable } from '@angular/core';
import { Toast } from '../types/toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts: Toast[] = [];

  public showErrorToast(message?: string): void {
    this.show({
      header: 'Error',
      body: message || 'Something went wrong, please try again later',
      className: 'bg-danger text-light'
    })
  }

  public show(toast: Toast): void {
    this.toasts.push(toast);
  }

  public removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
