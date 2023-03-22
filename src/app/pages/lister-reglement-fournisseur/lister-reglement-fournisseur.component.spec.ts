import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerReglementFournisseurComponent } from './lister-reglement-fournisseur.component';

describe('ListerReglementFournisseurComponent', () => {
  let component: ListerReglementFournisseurComponent;
  let fixture: ComponentFixture<ListerReglementFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerReglementFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerReglementFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
