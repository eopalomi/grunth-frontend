import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datatype01Component } from './datatype01.component';

describe('Datatype01Component', () => {
  let component: Datatype01Component;
  let fixture: ComponentFixture<Datatype01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Datatype01Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Datatype01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
