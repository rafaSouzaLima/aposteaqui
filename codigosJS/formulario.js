function confirmarDados(formJS){
    const Usuario = {
        nome:"",
        dataNascimento:"",
        email:"",
        telefone:""
    }
    const UsuarioNovo = Object.create(Usuario);

    UsuarioNovo.nome = formJS.nome.value;
    UsuarioNovo.dataNascimento = formJS.dataNas.value;
    UsuarioNovo.email = formJS.emailUsu.value;
    UsuarioNovo.telefone = formJS.telefone.value;

    let data = new Date(UsuarioNovo.dataNascimento);

    let dia = (data.getDate() + 1).toString().padStart(2,'0');
    let mes = (data.getMonth() + 1).toString().padStart(2,'0');
    let ano = data.getFullYear();
    
    let dataFormatada = dia + "/" + mes + "/" + ano;

    UsuarioNovo.dataNascimento = dataFormatada;

    document.getElementById("nomeExibe").innerHTML = UsuarioNovo.nome;
    document.getElementById("dataNasExibe").innerHTML = UsuarioNovo.dataNascimento;
    document.getElementById("emailExibe").innerHTML = UsuarioNovo.email;
    document.getElementById("telefoneExibe").innerHTML = UsuarioNovo.telefone;
}