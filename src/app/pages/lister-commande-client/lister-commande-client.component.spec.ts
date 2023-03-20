import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerCommandeClientComponent } from './lister-commande-client.component';

describe('ListerCommandeClientComponent', () => {
  let component: ListerCommandeClientComponent;
  let fixture: ComponentFixture<ListerCommandeClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListerCommandeClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerCommandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
