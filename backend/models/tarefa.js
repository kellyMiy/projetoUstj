//importar o pacote
const mongoose = require('mongoose');

//definir o esquema "schema"
//é muito semelhante as bases  relacionais

const tarefaSchema = mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataConclusao: { type: Date, required: true },
    dataCadastro: { type: Date, required: true },
    idUsuario: { type: String, required: true }
});

//após criar o modelo, devemos exportá-lo para deixá-lo disponível
//para os outros módulos, para isso associamos ao titulo Tarefa

module.exports = mongoose.model('Tarefa', tarefaSchema);
