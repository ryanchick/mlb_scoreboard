import React from 'react';
import NavLink from './NavLink';
import { browserHistory } from 'react-router';

const BASE_URL = 'http://gd2.mlb.com/components/game/mlb/';

export default React.createClass({
  getInitialState(){
    return {
      games:[]
    }
  },
  componentDidMount(){
    this.getGames();
  },

  componentDidUpdate (prevProps) {
    let oldDate = prevProps.params.month + prevProps.params.day
    let newDate = this.props.params.month + this.props.params.day
    // console.log(oldDate)
    // console.log(newDate)
    if (newDate !== oldDate)
      this.getGames();
    // console.log(BASE_URL+'year_'+this.props.params.year+'/month_'+this.props.params.month+'/day_'+this.props.params.day+'/master_scoreboard.json')
  },

  componentWillUnmount () {
    this.serverRequest.abort();
  },
  getGames () {
    let url = BASE_URL+'year_'+this.props.params.year+'/month_'+this.props.params.month+'/day_'+this.props.params.day+'/master_scoreboard.json';
    console.log('url',url)
    this.serverRequest = $.get(url, (result) => {
      this.setState({
        games:result.data.games.game
      })

      console.log('state',this.state);
    })
  },
  render() {
    // console.log('render')
    console.log('games',this.state.games)
    if(this.state.games.length < 1){
      var games = <h3>There are no games today.</h3>
    } else {
      var games = this.state.games.map((game,index) => {
        return(
          <Game game={game} key={index} />
        )
      })
    }
    return (
      <div className='container'>
        <h3>Date: {this.props.params.year}-{this.props.params.month}-{this.props.params.day}</h3>
        <ul className="list-group">
          <div className='row'>
          {games}
          </div>
        </ul>
      </div>
    )
  }
})

const Game = React.createClass({
  handleClick(){
    let path = '/'+ this.props.game.id;
    console.log(path);
    browserHistory.push(path);
  },
  render (){
    let winner = '';
    if(parseInt(this.props.game.linescore.r.home) > parseInt(this.props.game.linescore.r.away)){
      winner = 'home';
      // console.log(this.props.game.home_team_name)
    } else if(parseInt(this.props.game.linescore.r.home) < parseInt(this.props.game.linescore.r.away)){
      winner = 'away';
      // console.log(this.props.game.away_team_name);
    }
    // console.log(winner)
    // console.log('game',this.props)
    if(!this.props.game.linescore){
      return (
      <li className='col-xs-6 list-group-item'>
        <table className='table'>
          <tbody>
          <tr>
            <th>{this.props.game.status.status}</th>
            <th>Hits</th>
            <th>Runs</th>
          </tr>
          <tr>
            <th>{this.props.game.away_team_name}</th>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th>{this.props.game.home_team_name}</th>
            <td>-</td>
            <td>-</td>
          </tr>
          </tbody>
        </table>
      </li>
      );
    }
    return(
      <li className='col-xs-6 list-group-item' onClick={this.handleClick}>
        <table className='table'>
          <tbody>
          <tr>
            <th>{this.props.game.status.status}</th>
            <th>Hits</th>
            <th>Runs</th>
          </tr>
          <tr style={{fontWeight:(winner === 'away'?'bold':'normal')}}>
            <td >{this.props.game.away_team_name}</td>
            <td>{this.props.game.linescore.h.away}</td>
            <td>{this.props.game.linescore.r.away}</td>
          </tr>
          <tr  style={{fontWeight:(winner === 'home'?'bold':'normal')}}>
            <td >{this.props.game.home_team_name}</td>
            <td>{this.props.game.linescore.h.home}</td>
            <td>{this.props.game.linescore.r.home}</td>
          </tr>
          </tbody>
        </table>
      </li>
    )
  }
})
