import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  standalone: true, 
  template: `
    <div class="order-container" style="padding: 20px; font-family: sans-serif;">
      <h2>Checkout Demo</h2>
      
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
  private http = inject(HttpClient);

  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  submitOrder(): void {
    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const mockPayload = { 
      userId: '60c72b2f9b1d8b2bad456789', // Example MongoDB ObjectId format
      items: [{ productId: 'prod_99', quantity: 2 }], 
      totalAmount: 49.99 
    };

    // Replace URL with your local Express server port tomorrow
    this.http.post('http://localhost:3000/api/orders', mockPayload).subscribe({
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
