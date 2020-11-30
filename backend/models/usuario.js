//importar o pacote
const mongoose = require('mongoose');

//definir o esquema "schema"
//é muito semelhante as bases  relacionais

const usuarioSchema = mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
  
});

//após criar o modelo, devemos exportá-lo para deixá-lo disponível
//para os outros módulos, para isso associamos ao titulo Tarefa

module.exports = mongoose.model('Usuario', usuarioSchema);
