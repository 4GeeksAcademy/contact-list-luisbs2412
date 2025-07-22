import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddContact = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postContact();
    console.log(inputs);
  }

const postContact = () => {

    fetch ("https://playground.4geeks.com/contact/agendas/luisbs/contacts", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json' 
        },
        body: JSON.stringify(inputs),

    }).then((respuesta) => {
      respuesta.json();
    })
      .then(() => {
         console.log('Éxito:', inputs);
        setInputs({});
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

    return (
        <>
        <div className="container">
            <h1 className="text-center">Agregar Contacto</h1>
            <form className="form-control"  onSubmit={handleSubmit}>
                <label className="form-label">Nombre Completo</label>
                <input 
                type="text" 
                className="form-control" 
                value={inputs.name || ""}
                onChange={handleOnChange}
                name="name"/>
                <label form="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name="email" onChange={handleOnChange} value={inputs.email || ""}/>
                <label htmlFor="" className="form-comtrol">Telefono</label>
                <input type="tel" name="phone" id="" className="form-control" onChange={handleOnChange} value={inputs.phone || ""} />
                <label className="form-label">Dirección</label>
                <input className="form-control" type="text" name="address" id="" onChange={handleOnChange} value={inputs.address || ""}/>
                

                <p />
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit" value="Submit">Guardar</button>
                </div>
            </form>
            <Link to="/">o volver a Contactos</Link>
        </div>
        </>
    )
}
export default AddContact;