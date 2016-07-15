import React from 'react'
import { browserHistory } from 'react-router';
const BASE_URL = 'http://gd2.mlb.com/components/game/mlb/';

export default React.createClass({
  getInitialState(){
    return {
      boxscore:{},
      linescore:[
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'},
        {away:'-',home:'-'}],
      totals:{away:'-',home:'-'}
    }
  },
  componentDidMount(){
    this.getGames();
  },

  componentWillUpdate (prevProps) {
    let oldDate = prevProps.params.year + prevProps.params.month + prevProps.params.day
    let newDate = this.props.params.year + this.props.params.month + this.props.params.day
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
    let url = BASE_URL+'year_'+this.props.params.year+'/month_'+this.props.params.month+'/day_'+this.props.params.day+'/gid_'+this.props.params.year+'_'+this.props.params.month+'_'+this.props.params.day+'_'+this.props.params.gameId.replace(/-/g,'_')+'/boxscore.json';
    console.log('url',url)
    this.serverRequest = $.get(url, (result) => {
    	console.log(result)
      this.setState({
      	boxscore:result.data.boxscore,
        linescore:result.data.boxscore.linescore.inning_line_score,
        totals:{home:result.data.boxscore.linescore.home_team_runs,away:result.data.boxscore.linescore.away_team_runs}
      })
      // console.log('state',this.state);
    })
  },
  render() {
  	console.log('renderstate',this.state)
    return (
      <div>
        <button className='btn btn-primary' onClick={browserHistory.goBack}>Back</button>
        <h2>{this.state.boxscore.away_fname} at {this.state.boxscore.home_fname}</h2>
        <table className='table'>
        	<tbody>
        	<tr>
        		<th>Inning</th>
        		<td>1</td>
        		<td>2</td>
        		<td>3</td>
        		<td>4</td>
        		<td>5</td>
        		<td>6</td>
        		<td>7</td>
        		<td>8</td>
        		<td>9</td>
        		<th>Total</th>
        	</tr>
        	<tr>
        		<th>{this.state.boxscore.away_fname}</th>
        		<td>{this.state.linescore[0].away}</td>
        		<td>{this.state.linescore[1].away}</td>
        		<td>{this.state.linescore[2].away}</td>
        		<td>{this.state.linescore[3].away}</td>
        		<td>{this.state.linescore[4].away}</td>
        		<td>{this.state.linescore[5].away}</td>
        		<td>{this.state.linescore[6].away}</td>
        		<td>{this.state.linescore[7].away}</td>
        		<td>{this.state.linescore[8].away}</td>
        		<th>{this.state.totals.away}</th>
        	</tr>
        	<tr>
        		<th>{this.state.boxscore.home_fname}</th>
        		<td>{this.state.linescore[0].home}</td>
        		<td>{this.state.linescore[1].home}</td>
        		<td>{this.state.linescore[2].home}</td>
        		<td>{this.state.linescore[3].home}</td>
        		<td>{this.state.linescore[4].home}</td>
        		<td>{this.state.linescore[5].home}</td>
        		<td>{this.state.linescore[6].home}</td>
        		<td>{this.state.linescore[7].home}</td>
        		<td>{this.state.linescore[8].home}</td>
        		<th>{this.state.totals.home}</th>
        	</tr>

        	</tbody>
        </table>
      </div>
    )
  }
})