from flask import Flask, render_template, redirect, request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'senha'

@app.route('/')
def home():
    return render_template('cadastro.html')

@app.route('/tests')
def mask():
    return render_template('testeMask.html')

@app.route('/submit_form', methods=['POST'])
def submitForm():
    nome            = request.form.get('nome')
    email           = request.form.get('email')
    senha           = request.form.get('senha')
    senhaConfirmada = request.form.get('confirmar_senha')
    dtNascimento    = request.form.get('data_nascimento')
    genero          = request.form.get('genero')
    celular         = request.form.get('celular')
    telefoneFixo    = request.form.get('telefone_fixo')
    cpf             = request.form.get('cpf')
    profissao       = request.form.get('profissao')
    cep             = request.form.get('cep')
    logradouro      = request.form.get('logradouro')
    numero          = request.form.get('numero')
    bairro          = request.form.get('bairro')
    cidade          = request.form.get('cidade')
    estado          = request.form.get('estado')
    complemento     = request.form.get('complemento')

    print(nome)

    return redirect('/')

if __name__ in "__main__":
    app.run(debug=True)