<div class='credits'>
    <p class="text"><strong>Sobre los datos: </strong>Cada tarde la aplicación combina los <a href='https://www.mscbs.gob.es/profesionales/saludPublica/ccayes/alertasActual/nCov/vacunaCovid19.htm' target='_blank' rel="noopener">archivos '.ods'</a> que el Centro de Coordinación de Alerta y Emergencias Sanitarias (CCAES) publica diariamente desde el 4 de enero. Aquí puedes obtener directamente el <a href='https://github.com/fndvit/covid-vaccination-tracker/blob/main/app/public/data.json?raw=true' target='_blank' rel="noopener">JSON</a> y el <a href='https://github.com/fndvit/covid-vaccination-tracker/blob/main/app/public/data.csv?raw=true' target='_blank' rel="noopener">CSV</a>.</p>
    <p class="text">Para la estimación de la fecha de finalización de la primera fase, dividimos el número de dosis que quedan por administrar entre la media aritmérica del ritmo diario de administración de vacunas desde el inicio del proceso. Para calcular las dosis que quedan por administrar, estimamos el número de personas que cada comunidad autónoma vacunará basandonos en el reparto actual de las vacunas, lo multiplicamos por dos (dosis necesarias), y deducimos las vacunas administradas hasta ahora.</p>
    <p class="text">Algunas fechas en la columna 'Fecha de la última vacuna registrada' (renombrada como 'hasta' en nuestros datos) son incorrectas, para Baleares y Canarias. Hasta que lo arreglen —o escribamos algo para captarlo— usamos 'fecha' (la fecha del informe) para visualizar la evolución diaria.</p>
    <p class="text"><strong>Diseño y programación:</strong> Fundació Visualització per a la Transparència</p>
    <p class="text">Anímate a <a href='https://github.com/fndvit/covid-vaccination-tracker' target='_blank' rel="noopener">contribuir al repositorio.</a> </p>
    <p class="text mission">La visualización puede revolucionar la difusión de los datos abiertos y revitalizar la transparencia. <a href="https://www.fundaciovit.org/get-involved" rel="noopener">Apoya nuestra misión</a>.</p>
</div>

<style>
    .credits p {
        color:#808080;
        
    }
    .credits {
        border-top: 3px solid #DCDCDC;
        padding-top:2rem;
    }
    a {
        color:#333;
        text-decoration: none;
        border-bottom: 1px dashed #333;
        transition: all .3s;
    }
    a:hover {
        color:#505050;
        background-color:#FFF;
        text-decoration: none;
        border-bottom: 1px solid #333;
    }
    .mission {
        border-top: 1px solid #DCDCDC;
        padding-top:2rem;
        font-style: italic;
        font-size: 1.15rem;
        max-width:70%;
    }
</style>