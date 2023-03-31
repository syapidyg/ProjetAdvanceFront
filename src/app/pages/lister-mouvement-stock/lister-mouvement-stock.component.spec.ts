import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerMouvementStockComponent } from './lister-mouvement-stock.component';

describe('ListerMouvementStockComponent', () => {
  let component: ListerMouvementStockComponent;
  let fixture: ComponentFixture<ListerMouvementStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerMouvementStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerMouvementStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
