import 'zone.js/dist/zone-node'
import 'reflect-metadata'

import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'

import { ngExpressEngine } from '@nguniversal/express-engine'

import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs'

import { Request, Response } from 'express'
import { InjectionToken } from '@angular/core'

export const REQUEST = new InjectionToken<Request>('REQUEST')
export const RESPONSE = new InjectionToken<Response>('RESPONSE')

export function universal(app) {
    const DIST_FOLDER = path.join(process.cwd(), 'dist')
    const {
        provideModuleMap
    } = require('@nguniversal/module-map-ngfactory-loader')
    const template = fs
        .readFileSync(path.join(DIST_FOLDER, 'public', 'index.html'))
        .toString()
    const {
        AppServerModuleNgFactory,
        LAZY_MODULE_MAP
    } = require('../../dist/server/main.bundle')

    enableProdMode()

    app.engine('html', (_, options, callback) => {
        let engine = ngExpressEngine({
            bootstrap: AppServerModuleNgFactory,
            providers: [
                provideModuleMap(LAZY_MODULE_MAP),
                { provide: 'request', useFactory: () => options.req, deps: [] }
            ]
        })
        engine(_, options, callback)
    })

    app.set('view engine', 'html')
    app.set('views', path.join(DIST_FOLDER, 'public'))

    app.get('*.*', express.static(path.join(DIST_FOLDER, 'public')))

    app.get('*', (req, res) => {
        res.render(path.join(DIST_FOLDER, 'public', 'index.html'), {
            req,
            res,
            providers: [
                {
                    provide: 'serverUrl',
                    useValue: `${req.protocol}://${req.get('host')}`
                }
            ]
        })
    })
}
