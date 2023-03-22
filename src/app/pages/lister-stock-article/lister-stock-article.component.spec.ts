import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerStockArticleComponent } from './lister-stock-article.component';

describe('ListerStockArticleComponent', () => {
  let component: ListerStockArticleComponent;
  let fixture: ComponentFixture<ListerStockArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerStockArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerStockArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
