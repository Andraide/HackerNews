import React, { Component, useEffect, useState } from 'react';
import BasicSelect from "../components/dropdown";
import { newsService } from "../services/news.service"
import { connect } from 'react-redux';
import { incrementAction, decreaseAction } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux'; 
const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });

const CounterValue = () => {
  const count = useSelector(store => store.count);
  return <div className="counter-value">{count}</div>;
};

const Home = () => {

    const [news, setNews] = useState(null)

    const count = useSelector(state => state.count)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(count)
        newsService.getNewsByFilter('angular').then((news) => setNews(news))
    })
    

    return (
    <div>
        <div>
        </div>
        <h1>Home</h1>
        <div>
            
        </div>
        <div>
            <CounterValue/>
            <button onClick={() => dispatch(incrementAction())}>increment</button>
            <button onClick={() => dispatch(decreaseAction())}>decrease</button>
        </div>
    </div>
    )
        
}


export default Home;
