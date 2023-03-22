import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerCommandeFournisseurComponent } from './lister-commande-fournisseur.component';

describe('ListerCommandeFournisseurComponent', () => {
  let component: ListerCommandeFournisseurComponent;
  let fixture: ComponentFixture<ListerCommandeFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerCommandeFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerCommandeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
