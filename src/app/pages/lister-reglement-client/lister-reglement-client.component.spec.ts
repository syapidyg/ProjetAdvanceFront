import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerReglementClientComponent } from './lister-reglement-client.component';

describe('ListerReglementClientComponent', () => {
  let component: ListerReglementClientComponent;
  let fixture: ComponentFixture<ListerReglementClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerReglementClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerReglementClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
