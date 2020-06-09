import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualizarProductoPage } from './actualizar-producto.page';

describe('ActualizarProductoPage', () => {
  let component: ActualizarProductoPage;
  let fixture: ComponentFixture<ActualizarProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
