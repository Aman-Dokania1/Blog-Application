import { TestBed } from '@angular/core/testing';

import { ToastTriggerService } from './toast-trigger.service';

describe('ToastTriggerService', () => {
  let service: ToastTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
