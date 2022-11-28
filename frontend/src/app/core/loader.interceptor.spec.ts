// Http testing module and mocking controller
//import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from './loader.service';
import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';

describe('LoaderInterceptor', () => {
  let interceptor: LoaderInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LoaderInterceptor, LoaderService ],
      imports: [
        //HttpClientTestingModule
      ]
        });
    interceptor = TestBed.inject(LoaderInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  /*it('should run intercept', () => {   
    let request: HttpRequest<any>;
    let next;
    const result = interceptor.intercept(request, next);
    expect(result).toBeDefined();
  });*/
});
