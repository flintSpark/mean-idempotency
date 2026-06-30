import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes this service globally discoverable by components
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/orders';

  placeOrder(payload: any): Observable<any> {
    // This request will now be intercepted by your functional interceptor!
    return this.http.post(this.apiUrl, payload);
  }
}
