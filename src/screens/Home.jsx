import React, { Component } from 'react';
import DropDownMenu from "../components/DropDownMenu";
import { newsService } from "../services/news.service"
import { connect } from 'react-redux';
import { incrementAction, decreaseAction } from '../redux/actions/actions';
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
            const { author, story_titile, story_url, created_at } = x
        })
    }

    render() {
        const { news } = this.state
        const { value, incrementAction, decreaseAction } = this.props;
        return (
        <div>
            <div>
               
            </div>
            <h1>Home</h1>
            <div>
                {news && this.newsList()}
            </div>
            <div>
                <h1>{value}</h1>
                <button onClick={incrementAction}>increment</button>
                <button onClick={decreaseAction}>decrease</button>
            </div>
        </div>
        )
    }    
}


const mapStateToProps = (state) => ({
  value: state.value,
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
