import React from 'react';
import '../headerPlantilla.css';

class Button extends React.Component{
  
  

  render(){
    return(
        <div className="row">
          <div className="col s12 center">
              <button className="buttonA"> Cerrar sesión</button>
          </div>
        </div>
    )
  }
}


export default Button;
