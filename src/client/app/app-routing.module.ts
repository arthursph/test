import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { TestComponent } from './test/test.component'
import { ResultComponent } from './result/result.component'
import { LegacyShareComponent } from './legacy-share/legacy-share.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'en',
        component: HomeComponent,
        data: { language: 'en' },
    },
    {
        path: 'se',
        component: HomeComponent,
        data: { language: 'se' },
    },
    {
        path: 'testi',
        component: TestComponent,
        data: { language: 'fi' },
    },
    {
        path: 'test',
        component: TestComponent,
        data: { language: 'en' },
    },
    {
        path: 'testet',
        component: TestComponent,
        data: { language: 'se' },
    },
    {
        path: 'en/test',
        component: TestComponent,
        data: { language: 'en' },
    },
    {
        path: 'se/testet',
        component: TestComponent,
        data: { language: 'se' },
    },
    {
        path: 'tulos/:id',
        component: ResultComponent,
        data: { language: 'fi' },
    },
    {
        path: 'result/:id',
        component: ResultComponent,
        data: { language: 'en' },
    },
    {
        path: 'resultat/:id',
        component: ResultComponent,
        data: { language: 'se' },
    },
    {
        path: 'en/result/:id',
        component: ResultComponent,
        data: { language: 'en' },
    },
    {
        path: 'se/resultat/:id',
        component: ResultComponent,
        data: { language: 'se' },
    },
    {
        path: 'jaa/:category/:co2e',
        component: LegacyShareComponent,
        data: { language: 'fi' },
    },
    {
        path: 'share/:category/:co2e',
        component: LegacyShareComponent,
        data: { language: 'en' },
    },
    {
        path: '**',
        redirectTo: '',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
