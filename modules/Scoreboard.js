import React from 'react'
import { browserHistory } from 'react-router'

export default React.createClass({
	toDate: function(e){
		console.log(1);
		console.log(e.target.value)
		let dateArr = e.target.value.split('-')
		console.log(dateArr)
		const path = '/'+dateArr[0]+'/'+dateArr[1]+'/'+dateArr[2];
		console.log(path)
		browserHistory.push(path)
	},


  render() {
  	let currentDate = this.props.params.year + '-' + this.props.params.month + '-' + this.props.params.day;
    return (
      <div>
      	<label>Date: </label>
        <input type="date" ref={node => {
          this.input = node;
        }} onChange={this.toDate} 
        defaultValue = {currentDate}/>
        {this.props.children}
      </div>
    )
  }
})
