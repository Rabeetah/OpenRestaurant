import React,{Component} from 'react';
import RegisterModal from '../../userProfile/staff/signup';

class Signupstaff extends Component {
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
  
  export default Signupstaff;