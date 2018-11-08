import { NgModule } from '@angular/core'
import {
    ServerModule,
    ServerTransferStateModule
} from '@angular/platform-server'
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppModule } from './app.module'
import { AppComponent } from './app.component'

import { UniversalInterceptor } from './utils/universal.interceptor'

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        ServerTransferStateModule,
        ModuleMapLoaderModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UniversalInterceptor,
            /* Multi is important or you will delete all the other interceptors */
            multi: true
        }
    ],

    bootstrap: [AppComponent]
})
export class AppServerModule {}
