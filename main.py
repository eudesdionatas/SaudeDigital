from flask import Flask, render_template, redirect, request, jsonify
import mysql.connector

app = Flask(__name__)
app.config['SECRET_KEY'] = 'senha'

db_config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost', # Porta padrão 3306
    'database': 'saudedigital'
}

@app.route('/')
def home():
    return render_template('cadastro.html')

@app.route('/tests')
def mask():
    return render_template('tests.html')

@app.route('/submit_form', methods=['POST'])
def submitForm():
    nome            = None if request.form.get('nome')              == '' else request.form.get('nome')
    email           = None if request.form.get('email')             == '' else request.form.get('email')
    login           = None if request.form.get('login')             == '' else request.form.get('login')
    senhaConfirmada = None if request.form.get('confirmar_senha')   == '' else request.form.get('confirmar_senha')
    dtNascimento    = None if request.form.get('data_nascimento')   == '' else request.form.get('data_nascimento')
    genero          = None if request.form.get('genero')            == '' else request.form.get('genero')
    celular         = None if request.form.get('celular')           == '' else request.form.get('celular')
    telefoneFixo    = None if request.form.get('telefone_fixo')     == '' else request.form.get('telefone_fixo')
    cpf             = None if request.form.get('cpf')               == '' else request.form.get('cpf')
    profissao       = None if request.form.get('profissao')         == '' else request.form.get('profissao')
    cep             = None if request.form.get('cep')               == '' else request.form.get('cep')
    logradouro      = None if request.form.get('logradouro')        == '' else request.form.get('logradouro')
    numero          = None if request.form.get('numero')            == '' else request.form.get('numero')
    bairro          = None if request.form.get('bairro')            == '' else request.form.get('bairro')
    localidade      = None if request.form.get('cidade_local')      == '' else request.form.get('cidade_local')
    estado          = None if request.form.get('estado')            == '' else request.form.get('estado')
    complemento     = None if request.form.get('complemento')       == '' else request.form.get('complemento')
    pontoReferencia = None if request.form.get('ponto_referencia')  == '' else request.form.get('ponto_referencia')

    # Conexão com banco de dados
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()
        
    # Inserção de dados na tabela
    query = """INSERT INTO paciente (cpf, nomeCompleto, email, genero, dtNascimento, estado, login, senha, logradouro, numero, bairro, cep, localidade, complemento, 
                                    pontoReferencia, profissao, celular, telefoneFixo) VALUES (%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s,%s, %s, %s)"""
    values =                        (cpf, nome, email, genero, dtNascimento, estado, login, senhaConfirmada, logradouro, numero, bairro, cep, localidade, complemento, 
                                    pontoReferencia, profissao, celular, telefoneFixo)
    cursor.execute(query, values)

    # Confirma a transação
    connection.commit()

    # Fecha a conexão
    cursor.close()
    connection.close()

    return f"Dados do usuário {nome} foram salvos com sucesso!"
    # return redirect('/')
    # Enviar uma resposta de sucesso
    # return jsonify({'message': senhaConfirmada})

if __name__ in "__main__":
    app.run(debug=True)