import React from 'react';
import NavegacionAdmin from "../../Componentes/NavegacionAdmin";
function DocenteList() {
    return (
        <div className="container-fluid">
            <NavegacionAdmin />
            <form className="form-neon">
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputSearch" className="bmd-label-floating">¿Qué docente estas buscando?</label>
                                <input type="text" className="form-control" id="inputSearch" maxLength="30" />
                            </div>
                        </div>
                        <div className="col-12">
                            <p className="text-center" style={{ marginTop: '40px' }}>
                                <button type="submit" className="btn btn-raised btn-info">
                                    <i className="fas fa-search"></i> &nbsp; BUSCAR
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            {/* Resultados de búsqueda */}
            <form>
                <input type="hidden" name="eliminar-busqueda" value="eliminar" />
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <div className="col-12 col-md-6">
                            <p className="text-center" style={{ fontSize: '20px' }}>
                                Resultados de la búsqueda <strong>“Buscar”</strong>
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="text-center" style={{ marginTop: '20px' }}>
                                <button type="submit" className="btn btn-raised btn-danger">
                                    <i className="far fa-trash-alt"></i> &nbsp; ELIMINAR BÚSQUEDA
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            {/* Tabla de resultados */}
            <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table table-dark table-sm">
                        <thead>
                            <tr className="text-center roboto-medium">
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Actualizar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí puedes mapear datos dinámicos usando un array */}
                            <tr>
                                <td>1</td>
                                <td>Juan</td>
                                <td>Pérez</td>
                                <td>juan.perez@example.com</td>
                                <td>123456789</td>
                                <td>
                                    <button type="button" className="btn btn-success">Modificar</button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Paginación */}
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">Atrás</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Siguiente</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default DocenteList;
