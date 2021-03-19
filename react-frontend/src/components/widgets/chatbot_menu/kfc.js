import React, {Component} from "react";
import Clayout from '../../layouts/customerLayout/customerlayout';
import {Button} from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";



class Kfc extends Component{
  constructor()
  {
    super();
    this.state = {
      visible : false,
      id:'5f96d52a5cb98c2e4816eb39',
    
    }

  }

  Load = () =>{
    this.setState({visible:true});

  }
  render(){
  //   if(this.state.visible){
  //     return <Clayout/>
  // }
  
  return (
    <div>
   

   <Router>
    <a className="link" href={`/restaurantview/${this.state.id}`} onClick={this.Load}><Button style={{backgroundColor:"transparent", color:'#F99245'}}type="primary">see menu</Button></a>
    {/* <Switch>
    <Route exact path="/restaurant/:id" component={Clayout}/>
    </Switch> */}
      </Router>
      
      </div>

      

  );
}
};

export default Kfc;