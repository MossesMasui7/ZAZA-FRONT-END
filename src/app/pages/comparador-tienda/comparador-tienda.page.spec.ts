import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComparadorTiendaPage } from './comparador-tienda.page';

describe('ComparadorTiendaPage', () => {
  let component: ComparadorTiendaPage;
  let fixture: ComponentFixture<ComparadorTiendaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparadorTiendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComparadorTiendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
