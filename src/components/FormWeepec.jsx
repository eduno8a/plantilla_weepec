import React from 'react';
import '../headerPlantilla.css';
import axios from 'axios'


class FormWeepec extends React.Component{
  constructor(props) {
    super(props);
    this.state = { items: '',
    direccionCalle: '', 
    direccionNoExt:'', 
    direccionNoInt:'', 
    codigoPostal:'', 
    direccionCol:'', 
    direccionEstado:'', 
    direccionReferencia:'', 
    direccionTel:'',
    estados: [],
    mascotaActive: 0,
    mascotas: [{nombre: 'Perrito', calle: 'Av 20', noExt: '10', noInt: '10', codigoPostal: '76080', colonia: 'Lomas de casa blanca', referencia: 'RefefePas', telefono: '4423232323'},
    {nombre: 'Enrique', calle: 'Av 30', noExt: '20', noInt: '20', codigoPostal: '76080', colonia: 'Lomas de casa blanca', referencia: 'Segundoes', telefono: '2222222222'}],
  };

    this.handleChange = this.handleChange.bind(this);
    this.codigoChange = this.codigoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectedMascota = this.selectedMascota.bind(this);
    // this.estadosChange = this.estadosChange.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  codigoChange(e){
    this.setState({ codigoPostal: e.target.value });
    const dataReact = this;
    if(e.target.value.length == 5){
      var urlEstado = "https://service.weepec.com/stock/cpcode?cp="+e.target.value+"&sorted=1";
      axios.get(urlEstado)
        .then(function (response) {
          console.log(response)
          dataReact.setState({ estados: [response.data.estado] })    
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const dataReact = this;
    console.log(dataReact.state.direccionCalle)
    axios.post('update/Adress', {
      calle_numero: 'Calle: '+dataReact.state.direccionCalle+'Número Int.'+dataReact.state.direccionNoExt+'Número Ext.'+dataReact.state.direccionNoInt,
      codigo_postal: dataReact.state.codigoPostal,
      colonia: dataReact.state.direccionCol,
      id_estado: dataReact.state.direccionEstado,
      telefono: dataReact.state.direccionTel,
      referencia: dataReact.state.direccionReferencia,
    })
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  selectedMascota(num){

  }
  render(){
    const { estados, mascotas} = this.state;
    let {mascotaActive} = this.state;
    return(
      <div className="row mascotasContainer">
        <div className="col s12 m4 fotoContainer">
          <ul className="col s10 offset-s1 center">
            {mascotas.map((mascota, index) => (<li key={mascota.nombre}>
              <div className="fotoMascota" onClick={()=>{ this.setState({ mascotaActive: index })}}>
                <span></span>
              <h2>{mascota.nombre}</h2>
              </div>
            </li>)) }

            
          </ul>
        </div>

        <div className="col s10 m8">
          <h2> {} </h2>
          <form className="col s10 offset-s1 contDir" onSubmit={this.handleSubmit}>
          <div className="input-field col m5 s12 ">
            <input id="direccionCalle" type="text" required name="direccionCalle" value={mascotas[mascotaActive].calle} onChange={this.handleChange} />
          <label for="direccionCalle">Calle </label>
          </div>
          <div className="input-field col m5 s12 offset-m2">
            <input id="direccionNoExt" type="text" required name="direccionNoExt" value={mascotas[mascotaActive].noExt} onChange={this.handleChange}/>
          <label for="direccionNoExt">No. Ext.</label>
          </div>
          <div className="input-field col m5 s12 ">
            <input className="validate" id="direccionNoInt" type="text" required name="direccionNoInt" value={mascotas[mascotaActive].noExt} onChange={this.handleChange}/>
          <label for="direccionNoInt">No. Int.</label>
          </div>
          <div className="input-field col m5 s12 offset-m2">
            <input id="direccionCP" type="number" name="codigoPostal" required value={mascotas[mascotaActive].codigoPostal} onChange={this.codigoChange} />
            <label for="direccionCP">Codigo Postal</label>
          </div>
          <div className="input-field col m5 s12 ">
            <input id="direccionCol" type="text" required name="direccionCol" value={mascotas[mascotaActive].colonia} onChange={this.handleChange}/>
          <label for="direccionCol">Colonia</label>
          </div>
          <div className="input-field col m5 s12 offset-m2">
            <select className="browser-default" id="direccionEstado" required>
              <option value="" disabled="" >Selecciona Estado </option>
              
              {estados.map(estado => (<option key={estado.id} value={estado.id}> {estado.name}</option>)) }
            </select>
          </div>
          <div className="col s12"></div>
          {/* <div className="input-field col m4 s10 offset-s1 offset-m1 left">
            <select className="browser-default" id="direccionMunicipio" v-model="direccion.municipio">
            <option value="" disabled="" selected="">Municipio</option>
            <option> Querétaro </option>
          </select>
          </div> */}
          <div className="input-field col s12">
            <input id="direccionReferencia" type="text" required name="direccionReferencia" value={this.state.direccionReferencia} onChange={this.handleChange} />
          <label for="direccionReferencia">Referencia</label>
          </div>
          <div className="input-field col m5 s10">
            <input id="direccionTel" type="number" required name="direccionTel" value={mascotas[mascotaActive].telefono} onChange={this.handleChange}/>
            <label for="direccionTel">Teléfono</label>
          </div>
          <div className="col m5 s6 offset-m2 center "> 
            <button className="buttonA"> Guardar</button>
          </div>
          
        </form>
        </div>
      </div>
    )
  }

}


export default FormWeepec;
