import React, { Component } from 'react';
import BasicSelect from "../components/dropdown";
import { newsService } from "../services/news.service"
const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null
        }
    }

    componentDidMount()
    {
        console.log("Mount", "Mount")
        newsService.getNewsByFilter('angular').then((news) => { 
            this.setState({ news }) 
            console.log("News", news)
            log.info("News")
        })
        //log.info("Log info working")
    }

    newsList()
    {
        const { news } = this.state
        console.log("List", news)
        /*news.map((x, i) => {
            log.info(Object.keys(x))
        })*/
    }

    render() {
        const { news } = this.state
        log.info("Render")
        return (
        <div>
            <div>
                <BasicSelect/>
            </div>
            <h1>Home</h1>
            <div>
                {news && this.newsList()}
            </div>
        </div>
        )
    }    
}

export { Home }
