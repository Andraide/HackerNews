import React, { Component } from 'react';
import BasicSelect from "../components/dropdown";
import { newsService } from "../services/news.service"
const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
            filterOne: 'all'
        }
    }

    componentDidMount()
    {
        newsService.getNewsByFilter('angular').then((news) => this.setState({ news }))
    }

    newsList()
    {
        const { news } = this.state
        news.map((x, i) => {
            console.log("Keys",Object.keys(x))
            const { author, story_titile, story_url, created_at } = x
        })
    }

    render() {
        const { news } = this.state
        
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
