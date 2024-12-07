import React from 'react'

export default function NavegacionAdmin() {
    return (
     
        <div> 
            <button class="btn btn-danger" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <i className='bi bi-arrow-right'></i>
            </button>
            

            <div className= "p-3 mb-2 bg-info-subtle  offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <img src="/img/navegacion/Avatar2.png" className="rounded-pill w-50 mx-auto d-block img-fluid hover-scale mb-3 border border-white 5-px" alt=""  style={{ transition: 'transform 0.3s', cursor: 'pointer'}} 
  
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}/>
            <figcaption class="roboto-medium text-center">
            <p class="h6"><i class="text-"> orientador <br /><small class="roboto-condensed-light">Administrador </small></i></p>
					</figcaption>
           
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="--bs-body-color-white">
                    <div className="--bs-body-color-rgb">
                        <div><i class="text-"></i>
                        <i class=""></i><p class="h6 " style={{ marginTop: '-35px' }}> <i class="text- ">&nbsp; &nbsp;&nbsp; Estudiante</i></p><i class=""></i>
                            <ul>
                            <p class="h6" style={{ marginTop: '' }}> <a href="" className="text-decoration-none"><i class="text-"></i> <i className="bi bi-mortarboard text-dark  ">&nbsp;&nbsp;</i> <span className=''><i class="text-dark "> Agregar Estudiante</i></span></a></p>
                            <p class="h6"><a href="" className="text-decoration-none"><i class="fas fa-clipboard-list fa-fw bi bi-clipboard2 text-dark"></i> &nbsp; <i class="text-dark">Lista Estudiante</i></a></p>
                            </ul><br />
                            <i class=""></i><p class="h6 " style={{ marginTop: '-20px' }}> <i class="text- ">&nbsp; &nbsp;&nbsp; Docente</i></p><i class=""></i>
                            <ul>
                                <p class="h6"> <a href="" className="text-decoration-none"><i class="text-"></i> <i className="bi bi-people text-dark  ">&nbsp;&nbsp;</i> <span className=''><i class="text-dark "> Agregar Docente</i></span></a></p>
                                <p class="h6"><a href="" className="text-decoration-none"><i class="fas fa-clipboard-list fa-fw bi bi-clipboard2 text-dark"></i> &nbsp; <i class="text-dark">Lista Docente</i></a></p>
                            </ul> <br />
                            <i class=""></i><p class="h6 " style={{ marginTop: '-20px' }}> <i class="text-dark ">&nbsp; &nbsp;&nbsp; Campañas</i></p><i class=""></i>
                            <ul>
                                <p class="h6"> <a href="" className="text-decoration-none"><i class="text-"></i> <i className="bi bi-plus text-dark  ">&nbsp;&nbsp;</i> <span className=''><i class="text-dark "> Crear Campaña</i></span></a></p>
                                <p class="h6"><a href="" className="text-decoration-none"><i class="fas fa-clipboard-list fa-fw bi bi-clipboard2 text-dark"></i> &nbsp; <i class="text-dark">Lista de Campañas</i></a></p>
                            </ul><br />
                            <i class=""></i><p class="h6 " style={{ marginTop: '-20px' }}> <i class="text-dark ">&nbsp; &nbsp;&nbsp; Certificados</i></p><i class=""></i>
                        <ul>
                            <p class="h6"><a href="" className="text-decoration-none"><i class="bi bi-clipboard2-check text-dark"></i> &nbsp; <i class="text-dark">Lista de Certificados</i></a></p>
                        </ul>
                        
                        </div>
                    </div>
                </div>
            </div>
       

        </div>
    )
}
