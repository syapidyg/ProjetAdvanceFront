import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterStockArticleComponent } from './ajouter-stock-article.component';

describe('AjouterStockArticleComponent', () => {
  let component: AjouterStockArticleComponent;
  let fixture: ComponentFixture<AjouterStockArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterStockArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterStockArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
