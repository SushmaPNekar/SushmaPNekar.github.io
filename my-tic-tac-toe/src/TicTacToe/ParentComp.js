import React, { Component } from 'react'
import { PlayersName, TicTacToe } from './ChildComp'



 class ParentComp extends Component {
     constructor(props) {
       super(props)
     
       this.state = {
          showBoard : false,
          p1: "",
          p2:""
          
       }
     }
     handleChangeState = (player1 , player2) =>{
        
         this.setState({
             showBoard : true,
             p1 : player1,
             p2 : player2
         },()=>{console.log(this.state.p1+" "+this.state.p2)})
        //  console.log(this.state.p1);
        //  console.log(this.state.p1);

     }
     

    
     

  render() {
  
    return (
        this.state.showBoard ? <TicTacToe user1 = {this.state.p1} user2 = {this.state.p2} /> : <PlayersName handleState = {this.handleChangeState} />
   
    )
  }
}

export default ParentComp