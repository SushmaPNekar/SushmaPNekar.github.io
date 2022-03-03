import React, { Component } from 'react'
import { useState } from 'react'
import './TicTacToe.css'
import { useEffect } from 'react'

class ChildComp extends Component {
  render() {
    return (
      <div>ChildComp</div>
    )
  }
}

export class PlayersName extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         p1:"",
         p2:""
      
      }
    }
   
    handleChange = (event) =>{
      
       let player = event.target.id
        
        
        this.setState({
            [player] : event.target.value
       
        })
       
    
        
    }
    
    shouldStartGame = () =>{
        const p1 = this.state.p1;
        const p2 = this.state.p2;
        if(p1 != "" && p1 != ""){
          
            this.props. handleState(p1,p2);
          
        }
    }
 render() {

   return (
     <div>
         
         <label>Player 1 : </label><input id='p1' type="text" onChange={this.handleChange} /><br/>
         <label>Player 1 : </label><input id='p2' type="text" onChange={this.handleChange} /><br/>
         <button onClick={this.shouldStartGame}>Start game</button>
     </div>
   )
 }
}


export const TicTacToe = (props) => {
  
   const [turn,setTurn] = useState("x");
   const [cells,setCells] = useState(Array(9).fill(""));
   const [winner,setWinner] = useState(null);

   const checkWinner = (square) =>{
       const combos = {
           across : [
               [0,1,2],
               [3,4,5],
               [6,7,8]
           ],
           down : [
               [0,3,6],
               [1,4,7],
               [2,5,8]
           ],
           diagonal :[
               [0,4,8],
               [2,4,6]
           ]
       }

       for(let combo in combos){
           combos[combo].forEach(pattern =>{
               if(square[pattern[0]]=="" || square[pattern[1]] == "" || square[pattern[2]] == ""){
                   // do ntng
               }
               else if(
                   square[pattern[0]] === square[pattern[1]] && 
                   square[pattern[2]] === square[pattern[1]]
                   ){
                       
                       if(square[pattern[0]] === "x"){
                            setWinner(props.user1);
                       }else{
                           setWinner(props.user2); 
                       }   
               }
           })
       }
    
     
   }

   const handleClick = (num)=>{
        if(winner){
            return;
        }
       const square = [...cells]
      if(cells[num] != ""){
          return;
      }
      if(turn === "x"){
          square[num]  = "x";
          setTurn("o");
          
         
         
      }else{
          square[num] = "o";
           setTurn("x");
           
          
      }
     checkWinner(square);
     setCells(square);
    // checkTurn();
   }

   const checkTie = (square) =>{
    checkWinner(square);
       var isTie = true;
    for(var i = 0;i<square.length;i++){
        var element = square[i];
       
        if(element == ""){
            var isTie = false;
           }
    }
    return isTie   
       }
       
   
   useEffect(() => {displayTurn()}, [turn])

   const Cell = ({num}) =>{
      
       return <td onClick={()=>handleClick(num)} >{cells[num]}</td>
   }
   

    const handleClearBoard = () =>{
        setCells(Array(9).fill(""));
         setWinner(null);
         setTurn("x");
         const ele =  document.getElementById("turn");
         ele.classList.remove("winner");
         //handleClick(0);

    }
    const displayTurn = () =>{
        const square = [...cells]
        if(winner){
            const msg = `Congratulations ${ winner}
            you are our Winner!`;
            const el =  document.getElementById("turn");
            el.innerHTML = msg;
           el.classList.add("winner");

            return;
        }
        var isTie = checkTie(square);
     console.log(isTie)
     if(isTie){
         alert("Match tied ");
         return;
     }
        if(turn === 'x'){
            document.getElementById("turn").innerHTML=props.user1+", you are up! (x)"
        }else{
            document.getElementById("turn").innerHTML=props.user2+", you are up! (o)"
        }
    }
    
   
   
 return (
    
   <div className='container'>
      
       <p id='turn' >{props.user1}, you are up! (x)</p>
       <table cellpadding ="0" >
            
       <tbody cellspacing="0">
           <tr>
               <Cell num={0}/>
               <Cell num={1}/>
               <Cell num={2}/>
           </tr>
           <tr>
               <Cell num={3}/>
               <Cell num={4}/>
               <Cell num={5}/>
           </tr>
           <tr>
               <Cell num={6}/>
               <Cell num={7}/>
               <Cell num={8 }/>
           </tr>
       </tbody>
      
   </table>

   
    <button onClick={()=> handleClearBoard()}>Clear board</button>
   </div>
 )
}

export default ChildComp