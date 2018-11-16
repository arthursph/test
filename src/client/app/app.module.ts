import {
    BrowserModule,
    BrowserTransferStateModule,
} from '@angular/platform-browser'
import { NgModule, Inject, PLATFORM_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Http, HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { TestComponent } from './test/test.component'
import { CategoryComponent } from './category/category.component'
import { QuestionComponent } from './question/question.component'
import { ResultComponent } from './result/result.component'

import { FilterPipe } from './pipes/filter.pipe'
import { RoundUpPipe } from './pipes/round-up.pipe'
import { SortPipe } from './pipes/sort.pipe'
import { SortByIndexPipe } from './pipes/sort-by-index.pipe'
import { SortByCategoryPipe } from './pipes/sort-by-category.pipe'
import { ThousandSeparatorPipe } from './pipes/thousand-separator.pipe'

import { CategoryService } from './services/category.service'
import { ResultService } from './services/result.service'
import { TestService } from './services/test.service'
import { NavigationService } from './services/navigation.service'
import { ChartComponent } from './chart/chart.component'
import { TipComponent } from './tip/tip.component'

import { ClickOutsideModule } from 'ng-click-outside'

import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { UniversalTranslateLoader } from './utils/universal.translate-loader'
import { LegacyShareComponent } from './legacy-share/legacy-share.component'

export function translateFactory(
    platformId: any,
    http: Http,
    httpClient: HttpClient
): TranslateLoader {
    const browserLoader = new TranslateHttpLoader(httpClient)
    return new UniversalTranslateLoader(
        platformId,
        browserLoader,
        'dist/public/assets/i18n'
    )
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ResultComponent,
        QuestionComponent,
        CategoryComponent,
        TestComponent,
        ChartComponent,
        RoundUpPipe,
        FilterPipe,
        TipComponent,
        SortPipe,
        SortByIndexPipe,
        SortByCategoryPipe,
        LegacyShareComponent,
        ThousandSeparatorPipe,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'sitra-elamantapatesti' }),
        BrowserTransferStateModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ClickOutsideModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateFactory,
                deps: [PLATFORM_ID, Http, HttpClient],
            },
        }),
    ],
    exports: [
        AppComponent,
        HomeComponent,
        ResultComponent,
        QuestionComponent,
        CategoryComponent,
        TestComponent,
    ],
    providers: [CategoryService, ResultService, TestService, NavigationService],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {}
}
