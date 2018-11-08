/*
*
*   Run with ts-node
*   NOTE: script doesn't stop automatically
*
*/

import * as mongoose from 'mongoose'
import * as async from 'async'
import * as dotenv from 'dotenv'

import Tip from '../models/tip'
import { fetchTips } from './fetch-tips-from-wp'

dotenv.load({ path: '.env' })

let argument = process.argv[2]

if (argument == 'staging') {
    mongoose.connect(process.env.MONGOHQ_URL_STAGING, {
        useMongoClient: true,
    })
} else if (argument == 'production') {
    mongoose.connect(process.env.MONGOHQ_URL_PRODUCTION, {
        useMongoClient: true,
    })
} else {
    mongoose.connect(process.env.MONGOHQ_URL, {
        useMongoClient: true,
    })
}

function rawTip(tip) {
    return {
        wpId: tip.wpId,
        images: tip.images,
        title: tip.title,
        tag: tip.tag,
        url: tip.url,
        environmentEffect: tip.environmentEffect,
    }
}

function createUpdaterPromise(tip) {
    return new Promise((resolve, reject) => {
        Tip.findOne({ wpId: tip.wpId }, (err, doc) => {
            if (err) {
                return reject()
            }
            let _tip = rawTip(tip)
            let _doc = rawTip(doc)
            if (JSON.stringify(_tip) != JSON.stringify(_doc)) {
                Tip.findOneAndUpdate(
                    { _id: doc._id },
                    _tip,
                    { new: true },
                    (err, updatedDoc) => {
                        if (err) {
                            return reject()
                        }
                        resolve({ orig: doc, updated: updatedDoc })
                    }
                )
            } else {
                // Default to resolve empty
                resolve()
            }
        })
    })
}

let updateTips = async function(cb) {
    let tips = await fetchTips()
    let promises = tips.map(tip => createUpdaterPromise(tip))
    Promise.all(promises).then(result => cb(null, result))
}

async.waterfall(
    [
        updateTips,
        (result, cb) => {
            const updatedTips = result.filter(item => !!item)
            updatedTips.forEach(item => console.log(item))
            console.log(`Updated ${updatedTips.length} tips`)
            cb()
        },
    ],
    err => {
        if (err) {
            console.error(err)
        } else {
            console.log('Finished')
            process.exit(0)
        }
    }
)
