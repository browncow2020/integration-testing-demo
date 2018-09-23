/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { UserDetailsComponent } from './user-details.component';

class RouterStub {
  navigate(params) {
  }
}

class ActivatedRouterStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  // params: Observable<any> = Observable.empty();

  get params() {
    return this.subject.asObservable();
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouterStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect the user to the users page after saving', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  it('should navigate user to the not found page when an invalid user id is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    const route: ActivatedRouterStub = TestBed.get(ActivatedRoute);
    // route.params.

    route.push({ id: 0 });

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
