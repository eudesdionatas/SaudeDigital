document.getElementById('cep').addEventListener('blur', function() {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const feedback = document.getElementById('cep-feedback');
    var cepField = this;
    // var cepValue = cepField.value;
    
    // Limpa os campos se o CEP estiver vazio
    if (cep === "") {
        $(this).removeClass('is-invalid');
        $(this).removeClass('is-valid');
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade_local').value = '';
        document.getElementById('uf').value = '';
        feedback.textContent = '';
        return;
    }

    // Verifica se o CEP tem 8 dígitos
    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    feedback.textContent = 'CEP não encontrado';
                    document.getElementById('logradouro').value = '';
                    document.getElementById('bairro').value = '';
                    document.getElementById('cidade_local').value = '';
                    document.getElementById('uf').value = '';
                    feedback.classList.add('d-block'); // Adiciona classe para mostrar feedback
                    cepField.classList.add('is-invalid');
                    cepField.classList.remove('is-valid');
                } else {
                    feedback.textContent = '';
                    document.getElementById('logradouro').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade_local').value = data.localidade;
                    document.getElementById('uf').value = data.uf;
                    feedback.classList.remove('d-block'); // Remove classe para esconder feedback
                    cepField.classList.remove('is-invalid');
                    cepField.classList.add('is-valid');
                }
            })
            .catch(error => {
                feedback.textContent = 'Erro ao buscar o CEP';
                console.error('Erro ao buscar o CEP:', error);
                feedback.classList.add('d-block'); // Adiciona classe para mostrar feedback
                cepField.classList.add('is-invalid');
            });
    } else {
        feedback.textContent = 'CEP inválido';
        document.getElementById('logradouro').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade_local').value = '';
        document.getElementById('uf').value = '';
        feedback.classList.add('d-block'); // Adiciona classe para mostrar feedback
        cepField.classList.add('is-invalid');
        cepField.classList.remove('is-valid');
    }
});