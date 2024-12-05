import React from 'react'

export default function NavegacionAdmin() {
    return (
        <div>
            <button class="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <i className='bi bi-arrow-right'></i>
            </button>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Colegio Fernando Gonzalez Ochoa</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="dropdown mt-3 text-decoration-none list-unstyled">
        
                        <li>
                            <i class="fas fa-users fa-fw"></i> &nbsp; Estudiantes <i class="fas fa-chevron-down"></i>
                            <ul>
                                <li>
                                    <a href="estudiante-new.html"><i class="fas fa-plus fa-fw"></i> &nbsp; Agregar Estudiante</a>
                                </li>
                                <li>
                                    <a href="estudiante-list.php"><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista de Estudiantes</a>
                                </li>

                                <li>
                                    <a href="estudiante-informe.html"><i class="fas fa-hand-holding-usd fa-fw"></i> &nbsp; INFORME DEL ESTUDIANTE</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                        <i class="fas fa-tshirt fa-fw"></i> &nbsp; Docentes <i class="fas fa-chevron-down"></i>
                            <ul>
                                <li>
                                    <a href="docente-new.html"><i class="text-primary-emphasis"> Agregar Docente</i> &nbsp; </a>
                                </li>
                                <li>
                                    <a href="docente-list.php"><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista de docentes</a>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <i class="fas  fa-user-secret fa-fw"></i> &nbsp; Campañas <i class="fas fa-chevron-down"></i>
                            <ul>
                                <li>
                                    <a href="campaña-new.html"><i class="fas fa-plus fa-fw"></i> &nbsp; Nueva Campaña</a>
                                </li>
                                <li>
                                    <a href="campaña-list.html"><i class="fas fa-clipboard-list fa-fw"></i> &nbsp; Lista de Campañas</a>
                                </li>
                                <li>
                                    <a href="campaña-search.html"><i class="fas fa-search fa-fw"></i> &nbsp; Buscar Campaña</a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="certificados.html"><i class="fas fa-store-alt fa-fw"></i> &nbsp; certificados</a>
                        </li>
                    </div>
                </div>
            </div>
       

        </div>
    )
}
