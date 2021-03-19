import React,{Component} from 'react';

import {Button} from 'react';
// import logo2 from '../assets/images/logo2.png'; 

 


class Addrestaurantadmin extends Component{
    constructor(){
    super()

};
render(){
    return(
        <center>
        <div className="div1">
        {/* <img src={logo2} alt="Logo" />  */}

            <h1 className="h1">Add Restaurant Admin</h1>
        <form>
         <div className="form-row">
          <div className="form-group col-md-6">
            <label>Enter username: </label>
            <br></br>
    
            <input type="text"  ref="name"  name="name"></input>
          </div>
         
            <br></br>
            <input className="butn" type="submit" value="Add"></input>
            
            
            </div>

        
        
       
      
         </form>
         </div>
         </center>
        

        
    
        
    );

        

            


    

    

}
}
export default Addrestaurantadmin