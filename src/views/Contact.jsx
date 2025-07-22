import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Card from "../components/Card";
import useGlobalReducer from '../hooks/useGlobalReducer';


const Contact = () => {

  const { store, dispatch } = useGlobalReducer();
  const [contacts, setContacts] = useState([])


  const getContacts = () => {
    fetch("https://playground.4geeks.com/contact/agendas/luisbs/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => {
        if ((respuesta.status) >= 404) {
          postUser();
        } else {
          return respuesta.json();
        }
      })
      .then((data) => {
        setContacts(data.contacts);
        dispatch({ type: "SET_CONTACTS", payload: data.contacts });
      })
      .catch((error) => console.log(error));
  };
  

  let user = "luisbs"
  const postUser = () => {
    fetch(`https://playground.4geeks.com/contact/agendas/${user}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          "slug": user
        }),
    }).then((respuesta) => {
      respuesta.json();
    })
      .then(() => {
        getContacts();
      })
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    getContacts();
  }, []);


  return (
    <>
      <div className="container pt-4">
        <div className="d-grid gap-2 d-md-flex justify-content-md-end pb-4">
          <Link className="btn btn-success" type="button" to="/AddContact">
            Add new Contact
          </Link>
        </div>
        {contacts.length === 0 ? (
          <p className="text-center">Añade tu primer contacto</p>
        ) : (
          contacts.map((item) => (
            <div className="container pb-4" key={item.id}>
              <Card {...item} getContacts={getContacts} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Contact;