import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LegacyShareComponent } from './legacy-share.component'

describe('LegacyShareComponent', () => {
    let component: LegacyShareComponent
    let fixture: ComponentFixture<LegacyShareComponent>

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [LegacyShareComponent]
            }).compileComponents()
        })
    )

    beforeEach(() => {
        fixture = TestBed.createComponent(LegacyShareComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
