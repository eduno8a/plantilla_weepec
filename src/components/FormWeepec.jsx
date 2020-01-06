import React from 'react';
import '../headerPlantilla.css';
import axios from 'axios';
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";


class FormWeepec extends React.Component{
  constructor(props) {
    super(props);
    this.state = { items: '',
    direccionCalle: '', 
    direccionNoExt:'', 
    direccionNoInt:'', 
    codigoPostal:'', 
    direccionCol:'', 
    direccionEstado: 0, 
    direccionReferencia:'', 
    direccionTel:'',
    estados: [],
    pruebaModal: 'seguro---',
    tiempoEstimado: 32,
    mascotaActive: 0,
    mascotas: [{nombre: 'Perrito', calle: 'Av 20', noExt: '11', noInt: '11', codigoPostal: '76080', colonia: 'Lomas de casa blanca', estado: 'Querétaro', referencia: 'RefefePas', telefono: '4423232323'},
               {nombre: 'Enrique', calle: 'Av 30', noExt: '22', noInt: '20', codigoPostal: '76080', colonia: 'Lomas de casa blanca', estado: 'Guanajuato', referencia: 'Segundoes', telefono: '2222222222'},
               {nombre: 'Enrique1', calle: 'Av 40', noExt: '33', noInt: '20', codigoPostal: '76080', colonia: 'Lomas de casa blanca', estado: 'Guanajuato', referencia: 'Segundoes', telefono: '2222222222'},
               {nombre: 'Enrique2', calle: 'Av 50', noExt: '44', noInt: '20', codigoPostal: '76080', colonia: 'Lomas de casa blanca', estado: 'Guanajuato', referencia: 'Segundoes', telefono: '2222222222'}],
  };

    this.handleChange = this.handleChange.bind(this);
    this.codigoChange = this.codigoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectedMascota = this.selectedMascota.bind(this);
    this.estimacionSemanas = this.estimacionSemanas.bind(this);
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
          dataReact.setState({ direccionEstado: response.data.estado.id })

        })
        .catch(function (error) {
          console.log(error)
        });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.estimacionSemanas();
    // const dataReact = this;
    // axios.post('update/Adress', {
    //   calle_numero: 'Calle: '+dataReact.state.direccionCalle+'Número Int.'+dataReact.state.direccionNoExt+'Número Ext.'+dataReact.state.direccionNoInt,
    //   codigo_postal: dataReact.state.codigoPostal,
    //   colonia: dataReact.state.direccionCol,
    //   id_estado: dataReact.state.direccionEstado,
    //   telefono: dataReact.state.direccionTel,
    //   referencia: dataReact.state.direccionReferencia,
    // })
    // .then(function (response) {
    //   console.log(response);
      
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  selectedMascota(num){
  }
  
  popupConfirm(){
    M.Modal.getInstance(document.getElementById('modal1')).open();
  }
  estimacionSemanas(){
    const dataReact = this.state;

    var zonas = [
        [9, 15, 11, 12, 13, 17, 21, 22, 24, 29],
        [1, 6, 14, 16, 18, 32],
        [7, 20, 27, 30], [8, 5, 10, 19, 25, 28],
        [4, 23, 31], [2, 3, 26]
      ]
      var zona = 100;
      for (var i = 0; i < zonas.length; i++) {
        for (var j = 0; j < zonas[i].length; j++) {
          if (zonas[i][j] == parseInt(dataReact.direccionEstado)) {
              zona = i;
              break;
          }
        }
      }
      if(zona == 100){
        console.log("lo-a-s-s-s-")
        M.toast({html: 'No se puede calcular el número de semanas verifique su estado', classes: 'backgroundRed'})
        return
      }
      var semanas = [
        { min: 3, max: 5 }, { min: 4, max: 6 },
        { min: 4, max: 6 }, { min: 4, max: 7 },
        { min: 4, max: 7 }, { min: 5, max: 8 }
      ];
      console.log("zona--"+zona)
      this.setState({ tiempoEstimado: semanas[zona].max});
      this.popupConfirm();
  }
  componentDidMount() {
    const options = {
      onOpenStart: () => {
        // console.log("Open Start");
      },
      onOpenEnd: () => {
        // console.log("Open End");
      },
      onCloseStart: () => {
        // console.log("Close Start");
      },
      onCloseEnd: () => {
        // console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render(){
    const { estados, mascotas, pruebaModal, tiempoEstimado} = this.state;
    let {mascotaActive} = this.state;
    return(
      <div className="row mascotasContainer">
        <div className="col s12 m4 fotoContainer">
          <ul className="col s10 offset-s1 center">
            {mascotas.map((mascota, index) => (<li key={mascota.nombre}>
              <div className="fotoMascota" onClick={()=>{ this.setState({ mascotaActive: index })}}>
                <span style={{background: 'url(/plantilla_img/foto-perfil.png)'}}></span>
                <h2>{mascota.nombre}</h2>
              </div>
            </li>)) }

            
          </ul>
        </div>

        <div className="col s12 m8">
          <button className="buttonA waves-effect waves-light btn modal-trigger" onClick={()=>{ this.estimacionSemanas()}}>Si</button>
          <form className="col s10 offset-s1 contDir" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col s12 exDireccion">
            <h1>{mascotas[mascotaActive].nombre}</h1>
            <h2>Dirección incorrecta</h2>
            <h3><strong>Calle:</strong> {mascotas[mascotaActive].calle},
                <strong> No. Ext.: </strong> {mascotas[mascotaActive].noExt}, 
                <strong> No. Int.: </strong> {mascotas[mascotaActive].noInt} <br/>
                <strong>Colonia: </strong> {mascotas[mascotaActive].colonia}
                <strong> CP: </strong> {mascotas[mascotaActive].codigoPostal} <br/>
                <strong>Estado: </strong> {mascotas[mascotaActive].estado} <br/>
                <strong>Teléfono: </strong> {mascotas[mascotaActive].telefono} <br/>
            </h3>
            </div>
          </div>
          <div className="input-field col m5 s12 ">
            <input id="direccionCalle" type="text"  required name="direccionCalle"  onChange={this.handleChange} />
          <label for="direccionCalle">Calle </label>
          </div>
          <div className="input-field col m5 s12 offset-m2">
            <input id="direccionNoExt" type="text"  required name="direccionNoExt"  onChange={this.handleChange}/>
          <label for="direccionNoExt">No. Ext.</label>
          </div>
          <div className="input-field col m5 s12 ">
            <input className="validate" id="direccionNoInt" type="text"  required name="direccionNoInt"  onChange={this.handleChange}/>
          <label for="direccionNoInt">No. Int.</label>
          </div>
          <div className="input-field col m5 s12 offset-m2">
            <input id="direccionCP" type="number" name="codigoPostal" required onChange={this.codigoChange} />
            <label for="direccionCP">Codigo Postal</label>
          </div>
          <div className="input-field col m5 s12 ">
            <input id="direccionCol" type="text"  required name="direccionCol" onChange={this.handleChange}/>
          <label for="direccionCol">Colonia</label>
          </div>
          <div className="input-field col m5 s12 offset-m2">
            <select className="browser-default" id="direccionEstado" name="direccionEstado" required onChange={this.handleChange}>
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
            <input id="direccionTel" type="number" required name="direccionTel" onChange={this.handleChange}/>
            <label for="direccionTel">Teléfono</label>
          </div>
          <div className="col m5 s6 offset-m2 center "> 
            <button className="buttonA"> Guardar</button>
          </div>
          
        </form>
        

        </div>
        <div
          ref={Modal => {this.Modal = Modal;}}
          id="modal1"
          className="modal">
          {/* If you want Bottom Sheet Modal then add 
                        bottom-sheet class to the "modal" div
                        If you want Fixed Footer Modal then add
                        modal-fixed-footer to the "modal" div*/}
          <div className="modal-content center row">
            <div className="col s10 offset-s1"> 
              <img src="/plantilla_img/check.png" style={{width: '50px'}}/>
              <h2 style={{color: '#62BB99'}}>Se guardo correctamente tu nueva dirección</h2>
              <p>El tiempo estimado para la entrega de tu placa es de <strong> {tiempoEstimado} </strong> semanas</p>
            </div>
          </div>
          <div className="row center">
            <a className="buttonA" onClick={()=>{ window.location.reload()}}>
              Cerrar
            </a>
          </div>
        </div>
      </div>
    )
  }

}


export default FormWeepec;
