document.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        cadastrarDespesa()
    }
})
class Despesa{
    constructor(dia, mes, ano, tipo, descricao, valor, entradaSaida){
        this.dia = dia
        this.mes = mes
        this.ano = ano
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
        this.entradaSaida = entradaSaida
    }
    validarDados(){
        for( let i in this){
            if(this[i]==null || this[i]==undefined || this[i]==''){
                return false
            } 
        }
        return true
    }

}
class Bd{
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId)+1
    }
    salvar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d)) //(INDENTIFICACAO DO OBJETO, OBJETO EM NOTACAO JSON)--stringify => transforma obejto literal em string
        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros(){
        let id = localStorage.getItem('id')
        let despesas = []
        for(let i=1; i<=id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))//parse => transforma string em objeto literal
            if(despesa === null){continue} // CONTINUE -> faz a estrutura de repetição desconsiderar o restante do codigo e ir para a proxima repetição
            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }
    pesquisar(despesaFiltro){
        let despesasFiltradas = []
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesaFiltro)

        if(despesaFiltro.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesaFiltro.ano)
        }
        if(despesaFiltro.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesaFiltro.mes)
        }
        if(despesaFiltro.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesaFiltro.dia)
        }
        if(despesaFiltro.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesaFiltro.tipo)
        }
        if(despesaFiltro.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesaFiltro.descricao)
        }
        if(despesaFiltro.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesaFiltro.valor)
        }
        if(despesaFiltro.entradaSaida != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.entradaSaida == despesaFiltro.entradaSaida)
        }
        
       return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)
    }
}
let bd = new Bd()


function cadastrarDespesa() {
    let dia = document.getElementById('dia')
    let mes = document.getElementById('mes')
    let ano = document.getElementById('ano')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    let entradaSaida = document.getElementById('entradaSaida')

    let despesa = new Despesa(
        dia.value,
        mes.value,
        ano.value,
        tipo.value,
        descricao.value,
        valor.value,
        entradaSaida.value
    )
    
    if(despesa.validarDados()){
        bd.salvar(despesa)
        dia.classList.add('is-valid')
        mes.classList.add('is-valid')
        ano.classList.add('is-valid')
        tipo.classList.add('is-valid')
        descricao.classList.add('is-valid')
        valor.classList.add('is-valid')
        entradaSaida.classList.add('is-valid')
        setTimeout(()=>{
            dia.classList.remove('is-valid')
            mes.classList.remove('is-valid')
            ano.classList.remove('is-valid')
            tipo.classList.remove('is-valid')
            descricao.classList.remove('is-valid')
            valor.classList.remove('is-valid')
            entradaSaida.classList.remove('is-valid')
            dia.value = ''
            mes.value = ''
            ano.value = ''
            tipo.value = ''
            descricao.value = ''
            valor.value = ''
            entradaSaida.value = ''
        },1000)
    }else{
        $('#erroGravacao').modal('show')//COMANDO JQUERY
    }
}

function carregaListaDespesas(despesas = [], filtro = false){
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }
    let listaDespesas = document.getElementById('listaDespesas') //selecionanado tbody
    listaDespesas.innerHTML = ''
    despesas.forEach(function(d){
        let linha = listaDespesas.insertRow() //cria linha (tr) na tabela
        linha.id = `row_${d.id}`
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`//cria coluna (td) na linha da tabela
        switch(parseInt(d.tipo)){
            case 1:
                d.tipo = 'Alimentação'
                break
            case 2:
                d.tipo = 'Educação'
                break
            case 3:
                d.tipo = 'Lazer'
                break
            case 4:
                d.tipo = 'Saúde'
                break
            case 5:
                d.tipo = 'Transporte'
                break
            case 6:
                d.tipo = 'Aula da Violão'
                break
            case 7:
                d.tipo = 'Estagio'
                break
            case 8:
                d.tipo = 'Trabalho Não Recorrente'
                break
            case 9:
                d.tipo = 'Aleatorio'
                break
            case 10:
                d.tipo = 'Dinheiro Guardado'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        if(d.entradaSaida === '2'){
           document.getElementById(`row_${d.id}`).style = 'background: rgba(4, 170, 109, 0.1)'
        }else if(d.entradaSaida === '3'){
            document.getElementById(`row_${d.id}`).style = 'background: rgba(255, 255, 0, 0.1)'
            d.valor = "-"+d.valor
        } else {
            document.getElementById(`row_${d.id}`).style = 'background: rgba(255, 3, 1, 0.1)'
            d.valor = "-"+d.valor
        }
        //criar botao para exclusao
        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    }) //percorrer cada indice do array
    console.log(despesas)
    let total = calcularValor(despesas)
    let valor = document.getElementById('valorTotal')
    valor.innerHTML  = total.total
    console.log(total.total)
    if(valor.innerHTML === 'undefined'){
        valor.innerHTML  = 0
    }
    if(parseFloat(valor.innerHTML) > 0){
        valor.style = 'color: green'
    }else if(parseFloat(valor.innerHTML) < 0){
        valor.style = 'color: red'
    }
}

function pesquisarDespesa(){
    let dia = document.getElementById('dia').value
    let mes = document.getElementById('mes').value
    let ano = document.getElementById('ano').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    let entradaSaida = document.getElementById('entradaSaida').value

    let despesa = new Despesa(dia, mes, ano, tipo, descricao, valor, entradaSaida)
    let despesasFiltradas = bd.pesquisar(despesa)

    this.carregaListaDespesas(despesasFiltradas, true)
}
function calcularValor(despesas){
    let valores = []
    let item = []
    let valorSaida=0
    let valorEntrada=0
    let total=0
    item = despesas
    console.log(despesas[0].valor)
    item.forEach(function(i){
        
        if(i.entradaSaida === '1'){
            valorSaida += parseFloat(i.valor)
        }else {valorEntrada += parseFloat(i.valor)}
        total = valorEntrada + valorSaida
        valores = {valorEntrada, valorSaida, total}
    })
    
    console.log('saida: '+valorSaida)
    console.log('entrada: '+valorEntrada)
    console.log('total: '+total)
    
    return valores
}



/*-------------------------------- GERANDO GRAFICOS --------------------------------*/

    let registros = bd.recuperarTodosRegistros()
    console.log(registros)
    let valorEJaneiro = 0
    let valorSJaneiro = 0
    let valorEFevereiro = 0
    let valorSFevereiro = 0
    let valorEMarco = 0
    let valorSMarco = 0
    let valorEAbril = 0
    let valorSAbril = 0
    let valorEMaio = 0
    let valorSMaio = 0
    let valorEJunho = 0
    let valorSJunho = 0
    let valorEJulho = 0
    let valorSJulho = 0
    let valorEAgosto = 0
    let valorSAgosto = 0
    let valorESetembro = 0
    let valorSSetembro = 0
    let valorEOutubro = 0
    let valorSOutubro = 0
    let valorENovembro = 0
    let valorSNovembro = 0
    let valorEDezembro = 0
    let valorSDezembro = 0
    for(let x=0; x<registros.length; x++){
        switch(registros[x].mes){
            case '1':
                if(registros[x].entradaSaida === '1'){
                    valorSJaneiro += parseFloat(registros[x].valor)
                }else{
                    valorEJaneiro += parseFloat(registros[x].valor)
                }
                break
            case '2':
                if(registros[x].entradaSaida === '1'){
                    valorSFevereiro += parseFloat(registros[x].valor)
                }else{
                    valorEFevereiro += parseFloat(registros[x].valor)
                }
                break
            case '3':
                if(registros[x].entradaSaida === '1'){
                    valorSMarco += parseFloat(registros[x].valor)
                }else{
                    valorEMarco += parseFloat(registros[x].valor)
                }
                break
            case '4':
                if(registros[x].entradaSaida === '1'){
                    valorSAbril += parseFloat(registros[x].valor)
                }else{
                    valorEAbril += parseFloat(registros[x].valor)
                }
                break
            case '5':
                if(registros[x].entradaSaida === '1'){
                    valorSMaio += parseFloat(registros[x].valor)
                }else{
                    valorEMaio += parseFloat(registros[x].valor)
                }
                break
            case '6':
                if(registros[x].entradaSaida === '1'){
                    valorSJunho += parseFloat(registros[x].valor)
                }else{
                    valorEJunho += parseFloat(registros[x].valor)
                }
                break
            case '7':
                if(registros[x].entradaSaida === '1'){
                    valorSJulho += parseFloat(registros[x].valor)
                }else{
                    valorEJulho += parseFloat(registros[x].valor)
                }
                break
            case '8':
                if(registros[x].entradaSaida === '1'){
                    valorSAgosto += parseFloat(registros[x].valor)
                }else{
                    valorEAgosto += parseFloat(registros[x].valor)
                }
                break
            case '9':
                if(registros[x].entradaSaida === '1'){
                    valorSSetembro += parseFloat(registros[x].valor)
                }else{
                    valorESetembro += parseFloat(registros[x].valor)
                }
                break
            case '10':
                if(registros[x].entradaSaida === '1'){
                    valorSOutubro += parseFloat(registros[x].valor)
                }else{
                    valorEOutubro += parseFloat(registros[x].valor)
                }
                break
            case '11':
                if(registros[x].entradaSaida === '1'){
                    valorSNovembro += parseFloat(registros[x].valor)
                }else{
                    valorENovembro += parseFloat(registros[x].valor)
                }
                break
            case '12':
                if(registros[x].entradaSaida === '1'){
                    valorSJDezembro += parseFloat(registros[x].valor)
                }else{
                    valorEJDezembro += parseFloat(registros[x].valor)
                }
                break
        }
    }
    //console.log('Janeiro: '+ valorEJaneiro, valorSJaneiro + 'feveriro: '+ valorEFevereiro, valorSFevereiro+ 'marco: '+ valorEMarco, valorSMarco+ 'abriu: '+ valorEAbril, valorSAbril+ 'maio: '+ valorEMaio, valorSMaio+ 'junho: '+ valorEJunho, valorSJunho+ 'julho: '+ valorEJulho, valorSJulho+ 'agosto: '+ valorEAgosto, valorSAgosto+ 'setembro: '+ valorESetembro, valorSSetembro+ 'outubro: '+ valorEOutubro, valorSOutubro+ 'novembro: '+ valorENovembro, valorSNovembro+ 'dezembro: '+ valorEDezembro, valorSDezembro)
    Highcharts.chart('containerGrafico', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Entradas e Saidas por mês ',
            align: 'left'
        },
        subtitle: {
            text: 'em 2024',
            align: 'left'
        },
        xAxis: {
            categories: ['Janeiro', 'Fevereiro', 'Março', 'Abriu', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            crosshair: true,
            accessibility: {
                description: 'Meses'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valor em real R$'
            }
        },
        tooltip: {
            valueSuffix: ' (1 MT)'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Entrada',
                data: [valorEJaneiro, valorEFevereiro, valorEMarco, valorEAbril, valorEMaio, valorEJunho, valorEJulho, valorEAgosto, valorESetembro, valorEOutubro, valorENovembro, valorEDezembro]
            },
            {
                name: 'Saida',
                data: [valorSJaneiro, valorSFevereiro, valorSMarco, valorSAbril, valorSMaio, valorSJunho, valorSJulho, valorSAgosto, valorSSetembro, valorSOutubro, valorSNovembro, valorSDezembro]
            }
        ]
    });
console.log(valorEJaneiro,valorSJaneiro)