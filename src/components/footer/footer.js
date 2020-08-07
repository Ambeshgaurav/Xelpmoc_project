import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './footer.css';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Footer extends Component {
  render() {
    return (
        // <section classNameName="copyright">
        //     <div classNameName="container-fluid">
        //         <div classNameName="row">
        //           <div classNameName="col-md-12">
        //               <p>Copyrights © 2020 All Rights Reserved by SHS</p>
        //               <div>
        //               <i classNameName="fab fa-facebook-f" size='2x'></i>
        //               <i classNameName ="fab fa-google"></i>
        //               </div>
        //           </div>
        //         </div>
        //     </div>
        // </section>
        
        <footer className="footer-wrap footer copyright">
<div className="footer-bottom-wrap">
          
		<div className="container-fluid">
    {/* <Link to="#" className="btn-bg-google-plus">
                <i className="fab fa-google" style={{"fontSize": '15px'}}></i>
            </Link> */}
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <div className="footer-copyright">
						  Copyrights © 2020 All Rights Reserved by SHS 
					  </div>
				</div>
				    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <div className="social-footer">      
                <div className="social-icons social-round"> 
                      <Link to="#" className="btn-bg-facebook">
                        <i className="fa fa-facebook-f" style={{"fontSize": '15px'}}></i>
                      </Link>
                      <Link to="#" className="btn-bg-google-plus">
                        <i className="fa fa-google" style={{"fontSize": '15px'}}></i>
                      </Link>
                </div>
              </div>
            </div>
            
        </div>
		</div>
	</div>
  </footer>  
    );
  }
}

export default Footer;
