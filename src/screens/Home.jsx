import React, { Component } from 'react';
import { Container } from "semantic-ui-react"
import DropDownMenu from "../components/DropDownMenu";
import { newsService } from "../services/news.service"
import { connect } from 'react-redux';
import { incrementAction, decreaseAction } from '../redux/actions/actions';
import { favService } from '../services/faves.services';
import { Pagination } from 'semantic-ui-react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
            filterOne: 'all',
            faves: null,
            currentPage: 1,
            nbPages: null
        }

        this.paginationClick = this.paginationClick.bind(this)
    }

    componentDidMount()
    {
        favService.getFaves()
        newsService.getNewsByFilter('angular').then(({hits, nbPages}) => this.setState({ news: hits, nbPages }))

        this.favorites = favService.favesSubject.subscribe(faves => { this.setState({ faves: faves }) })
    }

    componentDidUpdate()
    {
      console.log("Library update", this.props.library)
      console.log("Faves updata", this.state.faves)
    }

    addFavorite(story_id)
    {
      console.log("addFav story id", story_id)
      favService.setFaves(story_id)
    }

    newsList()
    {
        const { news } = this.state
        const { library } = this.props

        return news.map((x, i) => {
            const { author, story_titile, story_url, created_at, story_id } = x
            return (
              <div key={i} align="center" style={{ width: '40vw', backgroundColor: 'yellow', alignItems: 'center', alignContent: 'center', align: 'center' }}>
                <p>{author}</p>
                <button onClick={() => this.addFavorite(story_id)}>Fav!</button>
              </div>
            )
        })
    }

    pagination()
    {
        const { nbPages, currentPage } = this.state
        return (
          <Pagination defaultCurrentPage={1} onPageChange={this.paginationClick} totalPages={nbPages}/>
        )
    }

    paginationClick(event, data)
    {
      this.setState({ currentPage: data.activePage })
    }



    render() {


        const { news, nbPages } = this.state
        const { value, incrementAction, decreaseAction, library } = this.props;
        console.log("Library", library)
        console.log("Toogle", this.props.toogle)
        return (
        <div align='center' style={{ alignItems: 'center' }}>
            <Container>
                <DropDownMenu />
            </Container>
            <div style={{ height: 20 }}></div>
            <div style={{ backgroundColor: 'blue', width: '90vw', columns: '2 auto' }}>
               {news && this.newsList()}
            </div>
            <div>
              {nbPages && this.pagination()}
            </div>
        </div>
        )
    }    
}


const mapStateToProps = (state) => ({
  library: state.librarys.library,
  value: state.counter.value,
  toogle: state.toogleMenu.toogle
});

const mapDispatchToProps = (dispatch) => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
