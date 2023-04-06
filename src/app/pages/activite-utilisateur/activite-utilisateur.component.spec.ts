import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteUtilisateurComponent } from './activite-utilisateur.component';

describe('ActiviteUtilisateurComponent', () => {
  let component: ActiviteUtilisateurComponent;
  let fixture: ComponentFixture<ActiviteUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviteUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
