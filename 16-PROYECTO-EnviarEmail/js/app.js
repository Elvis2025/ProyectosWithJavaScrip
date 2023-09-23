document.addEventListener('DOMContentLoaded',function(){
    // Ojeto del email
    const email = {       
        email: '',
        asunto: '',
        mensaje: ''
    };
    console.log(email);
    
    // Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsusnto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type = "submit"]');
    const btnReset = document.querySelector('#formulario button[type = "reset"]');
    const spinner = document.querySelector('#spinners');

    // const alerta = document.getElementsByClassName('.error');
    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsusnto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit',enviarEmail)

    btnReset.addEventListener('click',function(e){
        e.preventDefault();

        // reiniciar el object

        reiniciarFormulario();
        
    });
    

// ----------------------------------------------------------------
// Funciones

    function enviarEmail(e){
        e.preventDefault();

        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(()=>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            reiniciarFormulario();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10',
            'font-bold','text-sm','uppercase');


            alertaExito.textContent = "Eviado Correctamente. !!!";

            formulario.appendChild(alertaExito);

            setTimeout(()=> {
                alertaExito.remove();
            },3000);
        },3000);


       reiniciarFormulario();
    }

    function validar(e){
        const txtBox = e.target.value;
        const id = e.target.id;
        const parentE = e.target.parentElement;
        // console.log(value);
        console.log(inputEmail.id);
        if(txtBox.trim() === ''){
            // if(value === inputEmail.target.id)
            validandoPorCampos(id,parentE,txtBox);
            email[e.target.name] = '';
            comprobarEmail();
            return;
            // inputEmail.classList.add('error');
        }
        
        if(e.target.id === inputEmail.id && !validarEmail(txtBox)){
            mostrarAlerta('El email no es válido.',parentE);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(parentE);
        
        // Asignando valores a al objeto Email
        email[e.target.name] = e.target.value.trim().toLowerCase();

        console.log(email);

        comprobarEmail();
    } 
    
    function validandoPorCampos(id,parentE,emailV){
        
        if(id === inputEmail.id){    
            // validarEmail(emailV)
                  
            mostrarAlerta('El campo Email es obligatorio',parentE);           
        }else{
            if(id === inputAsusnto.id){
                mostrarAlerta('El campo Asunto es obligatorio',parentE);                
            }else{
                mostrarAlerta('El campo Mensaje es obligatorio',parentE);                
            }
        }

    }

    function mostrarAlerta(alert,referencia){
        // Comprueba si ya existe una alerta
        limpiarAlerta(referencia);
        // Generar alerta en HTML
        const error = document.createElement('P');        
        
        error.classList.add('bg-red-600','text-white','p-2','text-center','error');
        error.textContent = alert;
        

        // Inyectar el errot al formulario
        referencia.appendChild(error);


        // formulario.innerHTML = error.innerHTML;

    }

    function limpiarAlerta(referencia){
        // comprueba que si existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            // Borrar alerta
            alerta.remove(); 
        }

    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        //  const resutado = regex.test(email)
         return regex.test(email); 
        //  console.log(resutado)

    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove("opacity-50");
        btnSubmit.disabled = false;
        
    }

    function reiniciarFormulario(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';


        formulario.reset();
        comprobarEmail();
    }
});