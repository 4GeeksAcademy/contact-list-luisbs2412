import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import avatar from "../img/imagen-usuario.avif"


function Card(props) {
    const postDelete = (id) => {
    fetch(`https://playground.4geeks.com/contact/agendas/luisbs/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        "content-type": "application/json",
      },
    })
      .then(() => {
        console.log("Contacto eliminado con exito");
        props.getContacts()
      })
      .catch((error) => console.log(error));
  }

  const handleOnDelete = () => {
    postDelete(props.id);
  }
    return (
        <>

            <div className="card" style={{ maxWidth: "1366px", margin: "auto" }}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={avatar} className="image" alt="perfil" />
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h5 className="card-title"><b>{props.name || "Tarea Vacia"}</b></h5>
                            <p className="card-text"><i className="fa-solid fa-location-dot" style={{ color: "#000000" }}></i>{props.address}</p>
                            <p className="card-text"><small className="text-body-secondary"><i className="fa-solid fa-phone" style={{ color: "#000000" }} />{props.phone}</small></p>
                            <p className="card-text"><i className="fa-solid fa-envelope" style={{ color: "#000000" }} />{props.email}</p>
                        </div>
                        <div className="botones">
                            <Link to={`/EditContact/${props.id}`}><i className="fa-solid fa-pen" style={{ color: "#000000" }}></i></Link>
                            <i className="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target={`#deleteModal-${props.id}`} style={{ color: "#000000" }}></i>
                        </div>
                    </div>
                </div>
            </div>

    {/* Modal de eliminar */}
      <div class="modal fade" id={`deleteModal-${props.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar Contacto</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ¿Está seguro que desea eliminar el contacto?  
              <p>Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" class="btn btn-danger" onClick={ handleOnDelete} data-bs-dismiss="modal">Si</button>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}

export default Card;