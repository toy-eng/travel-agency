import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Grab token from localStorage or state management
  const token =
    typeof localStorage === 'undefined'
      ? null
      : localStorage.getItem('auth_token');

  // Clone request to prepend base API URL if it's a relative path
  const apiReq = req.clone({
    url: req.url.startsWith('http') ? req.url : `${environment.apiUrl}/${req.url}`,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });

  return next(apiReq);
};
