import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioGraphComponent } from './portfolio-graph.component';

describe('PortfolioGraphComponent', () => {
  let component: PortfolioGraphComponent;
  let fixture: ComponentFixture<PortfolioGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
