import React from 'react';
import '../headerPlantilla.css';

class Header extends React.Component{
  
  

  render(){
    return(
      <div>
        {/* Header */}
        <div className="row headerPlantilla">
          <div className="container">
            <div className="col s3">
              <img src="plantilla_img/logo_weepec.png"/>
            </div>
            <div className="col s9">
                <h2>Estas son tus mascotas </h2>
            </div>
          </div>
        </div>
        {/* Header */}
        <br></br>

        {/* Button */}
        <div className="row">
          <div className="col s12 center">
              <button className="buttonA"> Cerrar sesión</button>
          </div>
        </div>
        {/* Button */}
        <br></br>
        {/* Input */}
        <div className="row">
          <div className="col s12">
            <div className="input-field col s6">
              <input id="last_name" type="text" className="validate"/>
              <label>Last Name</label>
            </div>
          </div>
        </div>
        {/* Input */}

        {/* Select */}
        <div className="row">
          <div className="col s12">
            <div className="col s6">
            <label>Selected</label>
            <select className="browser-default selectPlantilla">
              <option value="" disabled selected>Opciones</option>
              <option value="1">Opciones 1</option>
              <option value="2">Opciones 2</option>
              <option value="3">Opciones 3</option>
              <option value="4">Opciones 4</option>
            </select>
            </div>
          </div>
        </div>
        {/* Select */}

      </div>
    )
  }
}


export default Header;
