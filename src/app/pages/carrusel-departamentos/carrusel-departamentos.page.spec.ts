import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarruselDepartamentosPage } from './carrusel-departamentos.page';

describe('CarruselDepartamentosPage', () => {
  let component: CarruselDepartamentosPage;
  let fixture: ComponentFixture<CarruselDepartamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarruselDepartamentosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarruselDepartamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
