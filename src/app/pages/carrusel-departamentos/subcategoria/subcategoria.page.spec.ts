import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubcategoriaPage } from './subcategoria.page';

describe('SubcategoriaPage', () => {
  let component: SubcategoriaPage;
  let fixture: ComponentFixture<SubcategoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoriaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubcategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
