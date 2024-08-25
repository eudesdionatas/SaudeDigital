// Tratamento das máscaras dos campos celular, telefone fixo, cpf e cep
$(document).ready(function(){

    $('#celular').mask('(00) 00000-0000');
    $('#telefone_fixo').mask('(00) 0000-0000');
    $('#cpf').mask('000.000.000-00');
    $('#cep').mask('00000-000');

    // Intercepta o envio do formulário
    $('#form_cadastro').on('submit', function(event) {
        // Remove a máscara dos campos de celular, telefone fixo, cpf e cep 
        var celularLimpo        = $('#celular').val().replace(/\D/g, '');       // Remove tudo que não for dígito
        var telefoneFixoLimpo   = $('#telefone_fixo').val().replace(/\D/g, ''); // Remove tudo que não for dígito
        var cpfLimpo            = $('#cpf').val().replace(/\D/g, '');           // Remove tudo que não for dígito
        var cepLimpo            = $('#cep').val().replace(/\D/g, '');           // Remove tudo que não for dígito

        // Atribui o valor limpo aos campos celular, telefone fixo, cpf e cep
        $('#celular').val(celularLimpo);
        $('#telefone_fixo').val(telefoneFixoLimpo);
        $('#cpf').val(cpfLimpo);
        $('#cep').val(cepLimpo);

        // Antes de enviar o formulário, criptografa a senha

        event.preventDefault(); // Impede o envio imediato do formulário

        // Captura a senha do campo
        const password = $('#confirmar_senha').val();

        // Criptografa a senha usando SHA-256
        const hashedPassword = CryptoJS.SHA256(password).toString();

        // Exibe o valor criptografado no console
        console.log('Senha criptografada:', hashedPassword);

        // Substitui o valor do campo de senha pelo hash criptografado
        $('#confirmar_senha').val(hashedPassword);

        // Agora envia o formulário com a senha criptografada
        $('#form_cadastro').off('submit').submit();

    });

    // Função para validar o CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove tudo que não é dígito

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false; // CPF inválido se não tiver 11 dígitos ou se todos os dígitos forem iguais
        }

        var soma = 0, resto;
        for (var i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        for (i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para gerar o hash SHA-256
    function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        return crypto.subtle.digest('SHA-256', data)
            .then(hash => {
                return Array.from(new Uint8Array(hash))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
            });
    }
    
    // Valida o CPF quando o campo perde o foco
    $('#cpf').on('blur', function() {
        var cpf = $(this).val();
        if (cpf === '') {
            $(this).removeClass('is-invalid'); // Remove a classe de erro se o campo estiver vazio
            $(this).removeClass('is-valid');   // Remove a classe de sucesso se o campo estiver vazio
        } else if (validarCPF(cpf)) {
            $(this).removeClass('is-invalid');  // Remove a classe de erro se o CPF for válido
            $(this).addClass('is-valid');       // Adiciona a classe de sucesso (opcional)
        } else {
            $(this).removeClass('is-valid'); // Remove a classe de sucesso se o CPF for inválido
            $(this).addClass('is-invalid'); // Adiciona a classe de erro se o CPF for inválido
        }
    });

    // Valida o e-mail quando o campo perde o foco
    $('#email').on('blur', function() {
        const email = $(this).val();
        if (email === '') {
            $(this).removeClass('is-invalid is-valid'); // Remove a classe de erro se o campo estiver vazio
            $(this).removeClass('is-valid');            // Remove a classe de sucesso se o campo estiver vazio
        } else if (validarEmail(email)) {
            $(this).removeClass('is-invalid');  // Remove a classe de erro se o email for válido
            $(this).addClass('is-valid');       // Adiciona a classe de sucesso se o e-mail for válido
        } else {
            $(this).removeClass('is-valid') // Remove a classe de sucesso se o email for inválido
            $(this).addClass('is-invalid'); // Adiciona a classe de erro se o e-mail for inválido
        }
    });

    // Valida o e-mail quando o campo perde o foco
    $('#confirmar_senha').on('blur', function() {
        const confirmarSenha = $(this).val();
        var senha = $('#senha').val();
        if (confirmarSenha === '') {
            $(this).removeClass('is-invalid is-valid'); // Remove a classe de erro se o campo estiver vazio
            $(this).removeClass('is-valid');            // Remove a classe de sucesso se o campo estiver vazio
        } else if (confirmarSenha === senha) {
            $(this).removeClass('is-invalid');  // Remove a classe de erro se o email for válido
            $(this).addClass('is-valid');       // Adiciona a classe de sucesso se o e-mail for válido
        } else {
            $(this).removeClass('is-valid') // Remove a classe de sucesso se o email for inválido
            $(this).addClass('is-invalid'); // Adiciona a classe de erro se o e-mail for inválido
        }
    });    
    
    // Impede o envio do formulário se o CPF for inválido
    $('#form_cadastro').on('submit', function(event) {
        var cpf = $('#cpf').val();
        if (!validarCPF(cpf)) {
            event.preventDefault();
            $('#cpf').addClass('is-invalid'); // Adiciona a classe de erro se o CPF for inválido
        }

        const email = $('#email').val();
        if (!validarEmail(email)) {
            event.preventDefault();
            $('#email').addClass('is-invalid'); // Adiciona a classe de erro se o e-mail for inválido
        }        
    });
    
});


// Adiciona um evento 'blur' ao campo de email
document.getElementById('email').addEventListener('blur', function() {
    var emailField = this;
    var emailValue = emailField.value;

    // Regex para verificar o formato básico de email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailValue === ''){
        emailField.classList.remove('is-invalid');
        emailField.classList.remove('is-valid');
    }else  if (!emailPattern.test(emailValue)) {
        emailField.classList.add('is-invalid');
        emailField.classList.remove('is-valid');
    } else {
        emailField.classList.remove('is-invalid');
        emailField.classList.add('is-invalid');
    }
});

