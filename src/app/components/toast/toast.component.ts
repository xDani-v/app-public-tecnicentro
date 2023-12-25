import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
  message: string | null = '';
  type: string | null = '';
  confirmCallback?: () => void = () => { };
  subscription: Subscription | null = null;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.toastSubject.subscribe(({ type, message, confirmCallback }) => {
      this.type = type;
      this.message = message;
      this.confirmCallback = confirmCallback;
      if (type !== 'confirmation') {
        setTimeout(() => this.message = null, 2000);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onConfirm() {
    if (this.confirmCallback) {
      this.confirmCallback();
    }
    this.message = null;
    this.type = null;
  }

  onCancel() {
    this.message = null;
    this.type = null;
  }

  getToastClass() {
    return this.type === 'confirmation' ? 'toast-confirmation' : 'toast-alert';
  }
}