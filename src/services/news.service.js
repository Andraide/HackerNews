import { handleResponse } from "../helpers/handle-response";
const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

export const newsService = {
    getNews,
    getNewsByFilter
}


async function getNews() {
    const url = 'https://www.reddit.com/r/chile/new/.json?limit=100'

    const requestOptions = {
        method: 'GET',
        timeoutInterval: 15000,
    }

    return fetch(url, requestOptions)
            .then(handleResponse)
            .then(memes => {
                return Promise.resolve(memes)
            }).catch((err) => {
                console.log("Error ===>", err)
                const { status } = err
                return Promise.reject(err)
            })
}

async function getNewsByFilter(query) {
    log.info("SEARCHING", query)
    const url = 'https://hn.algolia.com/api/v1/search_by_date?query='+query+'&page=0'


    const requestOptions = {
        method: 'GET',
        timeoutInterval: 15000,
    }

    return fetch(url, requestOptions)
            .then(handleResponse)
            .then(news => {
                let hits =  news.hits.filter((hit) => {  
                    const { author, story_titile, story_url, created_at } = hit
                    if( author!=null && story_titile && story_url && created_at )
                    {
                        return false
                    }
                    else
                    {
                        return true
                    }
                })
                return Promise.resolve(hits)
            }).catch((err) => {
                console.log("Error ===>", err)
                const { status } = err
                return Promise.reject(err)
            })
}