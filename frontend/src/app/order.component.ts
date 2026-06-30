import { Component, inject, signal } from '@angular/core';
import { OrderService } from './order.service'; // Import your new service

@Component({
  selector: 'app-order',
  standalone: true, 
  template: `
    <div class="order-container" style="padding: 20px; font-family: sans-serif;">
      <h2>Mean Idempotency</h2>
      
      @if (errorMessage()) {
        <div style="color: red; margin-bottom: 10px;">{{ errorMessage() }}</div>
      }

      @if (successMessage()) {
        <div style="color: green; margin-bottom: 10px;">{{ successMessage() }}</div>
      }

      <button 
        [disabled]="isSubmitting()" 
        (click)="submitOrder()"
        style="padding: 10px 20px; cursor: pointer;">
        {{ isSubmitting() ? 'Processing...' : 'Place Order' }}
      </button>
    </div>
  `
})
export class OrderComponent {
  // Inject the service layer instead of raw HttpClient
  private orderService = inject(OrderService);

  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  submitOrder(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const mockPayload = { 
      userId: '60c72b2f9b1d8b2bad456789', 
      items: [{ productId: 'prod_99', quantity: 2 }], 
      totalAmount: 49.99 
    };

    this.orderService.placeOrder(mockPayload).subscribe({
      next: (response: any) => {
        this.isSubmitting.set(false);
        this.successMessage.set(response.message);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(err.error?.error || 'An error occurred.');
      }
    });
  }
}
