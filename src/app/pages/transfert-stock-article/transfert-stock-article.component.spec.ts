import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfertStockArticleComponent } from './transfert-stock-article.component';

describe('TransfertStockArticleComponent', () => {
  let component: TransfertStockArticleComponent;
  let fixture: ComponentFixture<TransfertStockArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfertStockArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransfertStockArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
