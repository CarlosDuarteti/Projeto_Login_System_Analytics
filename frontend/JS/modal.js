const customAlert = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");
const btnAlertConfirm = document.getElementById("btnAlertConfirm");

let acaoConfirmacao = null;

function mostrarAlerta(
    mensagem, 
    elementoFoco = null, 
    tipo = "erro", 
    acao = null
){

    alertMessage.textContent = mensagem;

    const alertCard = customAlert.querySelector(".alert-box");

    alertCard.classList.remove(
        "success",
        "error"
    )

    if( tipo === "sucesso"){

        alertCard.classList.add("success");

        alertCard.querySelector("h3").textContent = "Sucesso";
    }else{

        alertCard.classList.add("error");

        alertCard.querySelector("h3").textContent = "Aviso importante!";
    }

    if( elementoFoco ){

        customAlert.dataset.focus = elementoFoco.id;

    }else{

        customAlert.dataset.focus = "";

    }

    acaoConfirmacao = acao;

    customAlert.style.display = "flex";

   
}

 btnAlertConfirm.addEventListener("click", 
        () => {
            customAlert.style.display = "none";

            const id = customAlert.dataset.focus;

            if( id ){
                const elemento = document.getElementById(id);

                if( elemento ){
                        elemento.focus();
                }
            }

            if(acaoConfirmacao){
                acaoConfirmacao();
                acaoConfirmacao = null;
            }
        }
    )