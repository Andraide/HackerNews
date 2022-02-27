import React, { Component } from 'react';
import { Container } from "semantic-ui-react"
import DropDownMenu from "../components/DropDownMenu";
import { newsService } from "../services/news.service"
import { connect } from 'react-redux';
import { incrementAction, decreaseAction } from '../redux/actions/actions';
import { favService } from '../services/faves.services';
import { Pagination } from 'semantic-ui-react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import RedHeart from '../assets/icons/heart/red/image.png'
import WhiteHeart from '../assets/icons/heart/white/image.png'
import Watch from '../assets/icons/watch/image.png'


const getLogger = require('webpack-log');
const log = getLogger({ name: 'About logs' });


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            news: null,
            filterOne: 'all',
            faves: [],
            currentPage: 0,
            nbPages: null,
        }

        this.paginationClick = this.paginationClick.bind(this)
    }

    componentDidMount()
    {
        favService.getFaves()
        
        newsService.getNewsByFilter('angular', this.state.currentPage).then(({hits, nbPages}) => this.setState({ news: hits, nbPages }))

        this.favorites = favService.favesSubject.subscribe(faves => { this.setState({ faves: faves }) })
    }

    componentDidUpdate(prevProps, prevState)
    {
      console.log("Library update", this.props.library)
      console.log("Library prevState", prevState.library)
      console.log("Faves updata", this.state.faves)

      if(this.props.library != prevProps.library)
      {
        console.log("Launching", this.props.library, prevProps.library)
        newsService.getNewsByFilter(this.props.library, this.state.currentPage).then(({hits, nbPages}) => this.setState({ news: hits, nbPages }))
      }

      if(this.state.currentPage != prevState.currentPage)
      {
        newsService.getNewsByFilter(this.props.library, this.state.currentPage).then(({hits, nbPages}) => this.setState({ news: hits, nbPages }))
      }
    }

    addFavorite(story_id)
    {
      console.log("addFav story id", story_id)
      favService.setFaves(story_id)
    }

    rmFavorite(story_id)
    {
      favService.rmFaves(story_id)
    }

    newsList()
    {
        const { news, faves } = this.state
        
        let cnt = 0
        let favoritesNews = news.filter((x) => {
          const { story_id, objectID } = x
          if(faves.indexOf(objectID) != -1)
          {
            return true
          }
          else
          {
            return false
          }
        })

        if(favoritesNews.length%2)
        {
          favoritesNews.push({ story_id: 'empty' })
        }

        if(this.props.toogle == 'FAVES')
        {
          return favoritesNews.map((x, i) => {
            const { author, story_title, story_url, created_at, story_id, objectID } = x

            if(faves.indexOf(objectID) != -1)
            {
              return (
                <div key={i} align="center" style={{ display: 'flex' ,flex: 1, flexDirection: 'row' ,width: '40vw', height: '13vh', backgroundColor: 'transparent', alignItems: 'center', alignContent: 'center', align: 'center', borderStyle: 'solid', borderWidth: '1px', marginBottom: '10px', borderRadius: '10px' }}>
                  <div style={{height: '70%' ,display: 'flex', flex: 0.8, flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flex: 0.3, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                      <div style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}><img src={Watch}></img></div>
                      <div style={{ display: 'flex', flex:0.9, alignItems: 'center', justifyContent: 'flex-start' }}>{created_at}</div>
                    </div>
                    <div style={{ height: '100%', display: 'flex', flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: '10px', backgroundColor: 'transparent' }}>
                      <p style={{ textAlign: 'left' }}>{story_title}</p>   
                    </div>
                  </div>
                  <div style={{ flex: 0.2 }}>
                    <button onClick={() => faves.indexOf(objectID) != -1 ? this.rmFavorite(objectID) : this.addFavorite(objectID)}><img src={faves.indexOf(objectID) != -1 ? RedHeart : WhiteHeart}/></button>
                  </div>
                </div>
              )
            }else if(story_id == 'empty')
            {
              return (
                <div key={i} align="center" style={{color: 'transparent', display: 'flex' ,flex: 1, flexDirection: 'row' ,width: '40vw', height: '13vh', backgroundColor: 'transparent', alignItems: 'center', alignContent: 'center', align: 'center', borderStyle: 'solid', borderWidth: '1px', marginBottom: '10px', borderRadius: '10px' }}>
                <p>Empty</p>
                </div>
              )
            }
          })
        }
        else
        {
          return news.map((x, i) => {
            const { author, story_title, story_url, created_at, story_id, objectID } = x
            console.log("X", x)
            return (
              <div key={i} align="center" style={{ display: 'flex' ,flex: 1, flexDirection: 'row' ,width: '40vw', height: '13vh', backgroundColor: 'transparent', alignItems: 'center', alignContent: 'center', align: 'center', borderStyle: 'solid', borderWidth: '1px', marginBottom: '10px', borderRadius: '10px' }}>
                <div style={{height: '70%' ,display: 'flex', flex: 0.8, flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flex: 0.3, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <div style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}><img src={Watch}></img></div>
                    <div style={{ display: 'flex', flex:0.9, alignItems: 'center', justifyContent: 'flex-start' }}>{created_at}</div>
                  </div>
                  <div style={{ height: '100%', display: 'flex', flex: 0.7, justifyContent: 'flex-start', alignItems: 'center', marginLeft: '10px', backgroundColor: 'transparent' }}>
                    <p style={{ textAlign: 'left' }}>{story_title}</p>   
                  </div>
                </div>
                <div style={{ flex: 0.2 }}>
                  <button onClick={() => faves.indexOf(objectID) != -1 ? this.rmFavorite(objectID) : this.addFavorite(objectID)}><img src={faves.indexOf(objectID) != -1 ? RedHeart : WhiteHeart}/></button>
                </div>
              </div>
              )
          })
        }
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
      this.setState({ currentPage: data.activePage - 1 })
    }



    render() {
        
        


        const { news, nbPages, faves } = this.state
        const { value, incrementAction, decreaseAction, library } = this.props;

       
        return (
        <div align='center' style={{ alignItems: 'center' }}>
            <div align='left' style={{ justifyContent: 'left', alignItems: 'left', margin: '20px 0px 0px 80px' }}>
              <h1>HACKER NEWS
              </h1>
            </div>
            <div style={{ backgroundColor: 'transparent', width: '90vw' }}>
              <div>
                <Container style={{ width: '40vw', align: 'left', alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <DropDownMenu />
                </Container>
              </div>
            </div>
            <div style={{ height: 20 }}></div>
            {news && <div align='center' style={{ backgroundColor: 'transparent', width: '90vw', columns:  '2 auto', alignItems: 'center', justifyContent: 'center' }}>
               {this.newsList()}
            </div>}
            <div style={{ marginTop: '10px' }}>
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
