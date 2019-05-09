import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarContentComponent } from './top-navbar-content.component';

describe('TopNavbarContentComponent', () => {
  let component: TopNavbarContentComponent;
  let fixture: ComponentFixture<TopNavbarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavbarContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
