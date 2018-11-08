import * as express from 'express'
import * as expressCluster from 'express-cluster'
import * as cluster from 'cluster'
import * as path from 'path'
import * as dotenv from 'dotenv'
import * as cors from 'cors'

import { database } from './database'
import { server } from './server'
import { router } from './router'
import { universal } from './universal'

dotenv.load({ path: '.env' })
const PORT = process.env.PORT || 3000

expressCluster(
    worker => {
        const app = express()
        const whitelist = [
            'http://localhost:4200',
            'https://sitra-elamantapatesti-staging.herokuapp.com',
            'https://sitra-elamantapatesti.herokuapp.com',
            'https://tubecon-ett-staging.herokuapp.com',
            'https://tubecon-elamantapatesti.herokuapp.com',
            'https://elamantapatesti.sitra.fi',
        ]

        const corsOptions = {
            origin: function(origin, callback) {
                if (whitelist.indexOf(origin) !== -1 || !origin) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
        }
        app.use(cors())
        app.options('*', cors())
        database()
        server(app)
        router(app)

        if (process.argv[2] === '--universal') {
            universal(app)
        }

        return app.listen(PORT)
    },
    { count: 2 }
)
