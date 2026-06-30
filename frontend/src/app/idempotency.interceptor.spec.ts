import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { idempotencyInterceptor } from './idempotency.interceptor';

describe('IdempotencyInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([idempotencyInterceptor])),
        provideHttpClientTesting() // Mocks the backend network database
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no mismatched requests are hanging
  });

  it('should attach an idempotency-key header to POST requests', () => {
    // 1. Trigger a mock POST request
    httpClient.post('/api/test', {}).subscribe();

    // 2. Expect and intercept the outbound request
    const req = httpTestingController.expectOne('/api/test');

    // 3. Assert that the custom header exists and is a valid string length
    expect(req.request.headers.has('idempotency-key')).toBe(true);
    expect(req.request.headers.get('idempotency-key')?.length).toBeGreaterThan(0);

    req.flush({}); // Resolve the request
  });

  it('should NOT attach an idempotency-key header to GET requests', () => {
    httpClient.get('/api/test').subscribe();

    const req = httpTestingController.expectOne('/api/test');
    expect(req.request.headers.has('idempotency-key')).toBe(false);

    req.flush({});
  });
});
