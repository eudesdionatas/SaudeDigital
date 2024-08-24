// Tratamento das máscaras dos campos celular, telefone fixo, cpf e cep
$(document).ready(function(){
    $('#celular').mask('(00) 00000-0000');
});

$(document).ready(function(){
    $('#telefonefixo').mask('(00) 0000-0000');
});

$(document).ready(function(){
    $('#cpf').mask('000.000.000-00');
});

$(document).ready(function(){
    $('#cep').mask('00000-00');
});


// Adiciona um evento 'blur' ao campo de email
document.getElementById('email').addEventListener('blur', function() {
    var emailField = this;
    var emailValue = emailField.value;

    // Regex para verificar o formato básico de email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailValue === ''){
        emailField.classList.remove('is-invalid');
    }else  if (!emailPattern.test(emailValue)) {
        emailField.classList.add('is-invalid');
    } else {
        emailField.classList.remove('is-invalid');
    }
});