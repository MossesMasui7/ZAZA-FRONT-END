import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComparadorPage } from './comparador.page';

describe('ComparadorPage', () => {
  let component: ComparadorPage;
  let fixture: ComponentFixture<ComparadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComparadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
