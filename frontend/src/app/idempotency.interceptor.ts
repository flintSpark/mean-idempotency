import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const idempotencyInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const uniqueKey = crypto.randomUUID(); 

    const clonedRequest = req.clone({
      headers: req.headers.set('Idempotency-Key', uniqueKey)
    });

    return next(clonedRequest);
  }
  return next(req);
};
