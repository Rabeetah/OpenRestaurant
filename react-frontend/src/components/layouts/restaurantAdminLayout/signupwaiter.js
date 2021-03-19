import React,{Component} from 'react';
import RegisterModal from '../../userProfile/waiter/signup';

class Signupwaiter extends Component {
    render()
    {
        return (
            <div className="App">
              <center>
      
             <div>
                 <RegisterModal {...this.props}/>
             </div>
             </center>
            </div>
          )
    }
    ;
  }
  
  export default Signupwaiter;