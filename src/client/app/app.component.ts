import { Component, OnInit, Inject, Injector, PLATFORM_ID } from '@angular/core'
import { Location, isPlatformBrowser, isPlatformServer } from '@angular/common'
import { Router, NavigationStart, NavigationEnd } from '@angular/router'
import { Title } from '@angular/platform-browser'

import { TranslateService, LangChangeEvent } from '@ngx-translate/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private location: Location,
        private router: Router,
        private injector: Injector,
        private titleService: Title,
        public translate: TranslateService
    ) {
        this.translate.setDefaultLang('fi')

        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.setTitle()
        })

        if (isPlatformServer(this.platformId)) {
            const subdomain = this.injector
                .get('request')
                .headers['host'].split('.')[0]
            if (subdomain === 'elamantapatesti') {
                this.translate.use('fi')
            } else if (subdomain === 'lifestyletest') {
                this.translate.use('en')
            } else if (subdomain === 'livsstilstest') {
                this.translate.use('se')
            } else if (!this.translate.currentLang) {
                this.translate.use('fi')
            }
        }

        // Detect if language is English and change translate.currentLang to affect the whole site
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (isPlatformBrowser(this.platformId)) {
                    const subdomain = document.location.hostname.split('.')[0]
                    if (subdomain === 'elamantapatesti') {
                        this.translate.use('fi')
                    } else if (subdomain === 'lifestyletest') {
                        this.translate.use('en')
                    } else if (subdomain === 'livsstilstest') {
                        this.translate.use('se')
                    } else if (!this.translate.currentLang) {
                        this.translate.use('fi')
                    }
                }

                const pathArgument = event.url.split('/')[1]
                if (pathArgument === 'en') {
                    this.translate.use('en')
                } else if (pathArgument === 'se') {
                    this.translate.use('se')
                }
            }
            if (event instanceof NavigationEnd) {
                if (this.router.routerState.root.firstChild) {
                    this.router.routerState.root.firstChild.data.subscribe(
                        data => {
                            if (data.language) {
                                this.translate.use(data.language)
                            }
                        }
                    )
                }
            }
        })
    }

    ngOnInit() {}

    setTitle() {
        this.translate.get('SHARE.HOME.TITLE').subscribe(translation => {
            this.titleService.setTitle('Sitra ' + translation)
        })
    }
}
