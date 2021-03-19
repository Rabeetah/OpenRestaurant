import React,{Component} from 'react';
import RegisterModal from '../../userProfile/restaurantAdmin/signup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Signupra extends Component {

  static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
}
    render()
    {
        return (
            <div className="App">
              <center>
      
             <div>
                 <RegisterModal/>
             </div>
             </center>
            </div>
          )
    }
    ;
  }
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, null) (Signupra);