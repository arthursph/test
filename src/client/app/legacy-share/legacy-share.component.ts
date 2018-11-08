import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { Meta } from '@angular/platform-browser'

import { TranslateService } from '@ngx-translate/core'
import { CategoryService } from '../services/category.service'

@Component({
    selector: 'app-legacy-share',
    templateUrl: './legacy-share.component.html',
    styleUrls: ['./legacy-share.component.scss']
})
export class LegacyShareComponent implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute,
        private translate: TranslateService,
        private metaService: Meta,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            window.location.href = '/'
        } else {
            let category: object
            let co2e: number

            this.route.paramMap.subscribe(params => {
                category = params['params'].category
                co2e = params['params'].co2e
                this.categoryService
                    .getCategoryByName(category)
                    .subscribe(category => {
                        const resultCategory =
                            category.slug[this.translate.currentLang]
                        const altTitle =
                            category.resultInfo.altTitle[
                                this.translate.currentLang
                            ]

                        // Open Graph

                        this.translate
                            .get('SHARE.FB.TITLE', { value: co2e })
                            .subscribe(translation => {
                                this.metaService.updateTag({
                                    property: 'og:title',
                                    content: translation
                                })
                            })
                        this.translate
                            .get('SHARE.FB.DESCRIPTION')
                            .subscribe(translation => {
                                this.metaService.updateTag({
                                    property: 'og:description',
                                    content: translation
                                })
                            })

                        // Twitter

                        this.metaService.updateTag({
                            property: 'twitter:card',
                            content: 'summary'
                        })
                        this.metaService.updateTag({
                            property: 'twitter:title',
                            content: altTitle
                        })
                        this.translate
                            .get('SHARE.TWITTER.DESCRIPTION', { value: co2e })
                            .subscribe(translation => {
                                this.metaService.updateTag({
                                    property: 'twitter:description',
                                    content: translation
                                })
                            })

                        // Common

                        this.translate.get('URL').subscribe(translation => {
                            this.metaService.updateTag({
                                property: 'og:image',
                                content:
                                    translation +
                                    'assets/images/share-' +
                                    resultCategory +
                                    '.png'
                            })
                            this.metaService.updateTag({
                                property: 'twitter:image',
                                content:
                                    translation +
                                    'assets/images/twitter-share-' +
                                    resultCategory +
                                    '.png'
                            })
                        })
                    })
            })
        }
    }
}
