
const estado = document.getElementsByName("estado")
const cidadeTexto = document.getElementsByName("cidade")

if (estado.value == "") {
    cidadeTexto.value.readOnly = true;
} // arrumar isso aqui depois