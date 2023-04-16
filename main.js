const form = document.getElementById('formulario');

const nomes =[];
const telefones = [];

let formNomeValido = false;
let formTelefoneValido = false;

let linhas = '';

form.addEventListener('submit', function(e){
    e.preventDefault();
    validaDadosInputs();
})


function validaDadosInputs(){
    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');

    const mensagemErro = document.querySelector('.mensagem-erro');
    const erroNome = "Adicione o nome completo!"
    const erroTelefone = "Adicione um número com DDD!"

    formNomeValido = validadeNome(inputNome.value);
    formTelefoneValido = telefone_validation(inputTelefone.value)
    
    if(!formNomeValido){
        mensagemErro.style.display = 'block'
        mensagemErro.innerHTML = erroNome;
    } else if (!formTelefoneValido){
        mensagemErro.style.display = 'block'
        mensagemErro.innerHTML = erroTelefone;
    } 
    else {
        let linha = '<tr>'
        linha+= `<td>${nome.value}`;
        linha+= `<td>${telefone.value}`;
        linha+= `</tr>`;
        linhas += linha;

        mensagemErro.style.display = 'none'
        
        const corpoTabela = document.querySelector('tbody');
        corpoTabela.innerHTML = linhas;
    }

    inputNome.value = '' ;
    inputTelefone.value = '';
}

function validadeNome(nomeCompleto){
    const nomeComArray = nomeCompleto.split(' ');
    return nomeComArray.length >= 2;
}

//Link da função: https://gist.github.com/jonathangoncalves/7bdec924e9bd2bdf353d6b7520820b62
function telefone_validation(telefone) {
    telefone = telefone.replace(/\D/g, '');

    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    for (var n = 0; n < 10; n++) {
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];

    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;

    if (new Date().getFullYear() < 2017) return true;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    return true;
}


//Link da Função: https://www.macoratti.net/18/09/js_pdf1.htm
function CriaPDF() {
    var minhaTabela = document.getElementById('table').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 20px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;}";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><thead>');
    win.document.write('<title>Lista Telefônica</title>');   // <title> CABEÇALHO DO PDF.
    win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
    win.document.write('</thead>');
    win.document.write('<tbody>');
    win.document.write(minhaTabela);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
    win.document.write('</body></html>');
    win.document.close(); 	                                         // FECHA A JANELA
    win.print();                                                            // IMPRIME O CONTEUDO
}