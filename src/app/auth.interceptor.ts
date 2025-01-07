import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  if (token) {
    // Clone the request to add the Authorization header
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned); // Pass the cloned request to the next handler
  }

  return next(req); // Pass original request if no token
};
