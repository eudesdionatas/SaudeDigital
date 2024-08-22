from flask import Flask, render_template, redirect, request

app = Flask(__name__)
app.config['SECRET_KEY'] = 'senha'

@app.route('/')
def home():
    return render_template('cadastro.html')

@app.route('/submit_form', methods=['POST'])
def submitForm():
    nome            = request.form.get('nome')
    email           = request.form.get('email')
    senha           = request.form.get('senha')
    senhaConfirmada = request.form.get('confirmar_senha')
    dtNascimento    = request.form.get('data_nascimento')
    genero          = request.form.get('genero')
    telefone        = request.form.get('telefone')
    endereco        = request.form.get('endereco')

    print(nome)

    return redirect('/')

if __name__ in "__main__":
    app.run(debug=True)