import { useParams, Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const EditContact = () => {
    const { store, dispatch } = useGlobalReducer();
    const params = useParams();
    const currentContact = store.contacts.find(contact => contact.id === parseInt(params.contactID));
    const [contact, setContact] = useState(currentContact || { name: "", email: "", phone: "", address: "" }); 
    const navigate = useNavigate();

    useEffect(() => {
        if (currentContact) {
            setContact({
                name: currentContact.name,
                phone: currentContact.phone,
                email: currentContact.email,
                address: currentContact.address
            });
        }
    }, [currentContact]);

    const handleOnChange = (e) => {
        setContact({...contact, [e.target.name]: e.target.value });
    };

    const updateContact = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/luisbs/contacts/${params.contactID}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
        })
          .then(response => response.json())
          .then(data => {
            dispatch({
                type: "UPDATE_CONTACT" ,
                payload: {...data, id: parseInt(params.contactID)}
            });
            navigate("/");
          })
          .catch(error => console.error("Error al actualizar el contacto:", error))
        
    }

    return (
         <>
        <div className="container"> 
            <h1 className="text-center">Editar a {params.contactID}</h1>
            <form className="form-control" action="">
                <label className="form-label">Nombre Completo</label>
                <input 
                type="text" 
                className="form-control"
                name="name"
                value = {contact.name} 
                onChange={handleOnChange}
                />
                <label form="exampleFormControlInput1" className="form-label">Email address</label>
                <input 
                type="email" 
                className="form-control"
                name="email"
                value = {contact.email} 
                onChange={handleOnChange}  
                placeholder="name@example.com" 
                />
                <label className="form-comtrol">Teléfono</label>
                <input 
                type="tel" 
                className="form-control" 
                name="phone" 
                id=""
                value={contact.phone}
                onChange={handleOnChange} 
                />
                <label className="form-label">Dirección</label>
                <input 
                className="form-control" 
                type="text" 
                name="address" 
                id=""
                value={contact.address}
                onChange={handleOnChange} 
                />
                

                <p />
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button" onClick={updateContact}>Actualizar</button>
                </div>
            </form>
            <Link to="/">o volver a Contactos</Link>
        </div>
        </>
    );
}

export default EditContact;