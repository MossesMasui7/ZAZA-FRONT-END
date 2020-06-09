import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilProductoPage } from './perfil-producto.page';

describe('PerfilProductoPage', () => {
  let component: PerfilProductoPage;
  let fixture: ComponentFixture<PerfilProductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilProductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
