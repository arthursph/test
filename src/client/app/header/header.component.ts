import { isPlatformBrowser, Location } from '@angular/common'
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { NavigationService } from '../services/navigation.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public navigationState: boolean = false
    public searchState: boolean = false
    public searchField: string = ''
    public navigation: any
    public languageSelectorState: boolean

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        public route: ActivatedRoute,
        public router: Router,
        public translate: TranslateService,
        private location: Location,
        private navigationService: NavigationService
    ) {}

    ngOnInit() {
        this.navigationService.getNavigation().subscribe(res => {
            this.navigation = res[0].html
        })
    }

    toggleNavigation() {
        if (this.searchState) {
            this.searchState = false
        }
        if (this.languageSelectorState) {
            this.languageSelectorState = false
        }
        this.navigationState = !this.navigationState
    }

    toggleSearch() {
        if (this.navigationState) {
            this.navigationState = false
        }
        if (this.languageSelectorState) {
            this.languageSelectorState = false
        }
        this.searchState = !this.searchState
    }

    toggleLanguageSelector() {
        if (this.navigationState) {
            this.navigationState = false
        }
        if (this.searchState) {
            this.searchState = false
        }
        this.languageSelectorState = !this.languageSelectorState
    }

    onSubmit() {
        if (isPlatformBrowser(this.platformId)) {
            this.translate.get('SEARCH_URL').subscribe(translation => {
                window.location.href = translation + this.searchField
            })
        }
    }

    changeLanguage(language) {
        if (this.location.path() === '') {
            this.translate.getTranslation(language).subscribe(value => {
                document.location.href = value.URL
            })
        } else if (
            this.location.path() === '/testi' ||
            this.location.path() === '/test' ||
            this.location.path() === '/testet'
        ) {
            this.translate.use(language)
            if (this.languageSelectorState) {
                this.languageSelectorState = !this.languageSelectorState
            }
            this.translate.get('TEST_URL').subscribe(value => {
                this.location.replaceState(value)
            })
        } else {
            this.translate.use(language)
            if (this.languageSelectorState) {
                this.languageSelectorState = !this.languageSelectorState
            }
            this.translate.get('RESULT_URL').subscribe(value => {
                this.location.replaceState(
                    value + '/' + this.location.path().split('/')[2]
                )
            })
        }
    }
}
