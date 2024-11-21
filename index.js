// Seleção de elementos do DOM
const planoAntigoInput = document.getElementById("planoAntigo");
const planoNovoInput = document.getElementById("planoNovo");
const ultimoPagamentoInput = document.getElementById("ultimoPagamento");
const dataMigracaoInput = document.getElementById("dataMigracao");
const creditoPlanoAntigoEl = document.getElementById("creditoPlanoAntigo");

const diariaAntigoEl = document.getElementById("diariaAntigo");
const diasUtilizadosAntigoEl = document.getElementById("diasUtilizadosAntigo");
const valorUtilizadoAntigoEl = document.getElementById("valorUtilizadoAntigo");
const diariaNovoEl = document.getElementById("diariaNovo");
const diasRestantesNovoEl = document.getElementById("diasRestantesNovo");
const valorUtilizadoNovoEl = document.getElementById("valorUtilizadoNovo");
const valorMigracaoEl = document.getElementById("valorMigracao");
const valorPlanoNovoEl = document.getElementById("valorPlanoNovo")
const planoAntigoUtilizadoEl = document.getElementById("planoAntigoUtilizado")

// Função para calcular o número de dias no mês de uma data
const diasNoMes = (data) => new Date(data.getFullYear(), data.getMonth() + 1, 0).getDate();

// Função principal para cálculo da migração
const calcularMigracao = () => {
  const valorPlanoAntigo = parseFloat(planoAntigoInput.value);
  const valorPlanoNovo = parseFloat(planoNovoInput.value);
  const ultimoPagamentoDate = new Date(`${ultimoPagamentoInput.value}T00:00`);
  const dataMigracaoDate = new Date(`${dataMigracaoInput.value}T00:00`);

  // Validação das datas
  if (dataMigracaoDate < ultimoPagamentoDate) {
    alert("A data de migração não pode ser anterior ao último pagamento.");
    return;
  }

  const limiteDate = new Date(ultimoPagamentoDate);
  limiteDate.setMonth(limiteDate.getMonth() + 1);

  if(dataMigracaoDate > limiteDate){
    alert("Data de migração não pode ser superior a data de vencimento da fatura no próximo mês corrente")
    return
  }

  console.log(limiteDate); // Exibe a data do limite
  const diasNoMesAtual = diasNoMes(ultimoPagamentoDate);

  // Cálculo para o plano antigo
  const diariaAntigo = valorPlanoAntigo / diasNoMesAtual;
  const diasUtilizadosAntigo = Math.ceil((dataMigracaoDate - ultimoPagamentoDate) / (1000 * 60 * 60 * 24));
  const valorUtilizadoAntigo = diariaAntigo * diasUtilizadosAntigo;

  // Cálculo do crédito restante
  const creditoRestante = valorPlanoAntigo - valorUtilizadoAntigo;

  // Cálculo para o plano novo
  const diariaNovo = valorPlanoNovo / diasNoMesAtual;
  const diasRestantesNovo = diasNoMesAtual - diasUtilizadosAntigo;
  const valorUtilizadoNovo = diariaNovo * diasRestantesNovo;

  // Valor da migração (considerando crédito restante)

  let valorMigracao = valorPlanoNovo - creditoRestante;
  
  // valorMigracao = valorMigracao === 0 ? valorPlanoNovo : valorMigracao
  // console.log(valorMigracao)

  // Atualização da interface
  diariaAntigoEl.textContent = diariaAntigo.toFixed(2);
  diasUtilizadosAntigoEl.textContent = diasUtilizadosAntigo;
  valorUtilizadoAntigoEl.textContent = valorUtilizadoAntigo.toFixed(2);
  creditoPlanoAntigoEl.textContent = creditoRestante.toFixed(2);
  // diariaNovoEl.textContent = diariaNovo.toFixed(2);
  // diasRestantesNovoEl.textContent = diasRestantesNovo;
  // valorUtilizadoNovoEl.textContent = valorUtilizadoNovo.toFixed(2);
  valorMigracaoEl.textContent = valorMigracao.toFixed(2);
  valorPlanoNovoEl.textContent = valorPlanoNovo;
  planoAntigoUtilizadoEl.textContent = creditoRestante.toFixed(2);
};

// Eventos para atualização em tempo real
planoAntigoInput.addEventListener("input", calcularMigracao);
planoNovoInput.addEventListener("input", calcularMigracao);
ultimoPagamentoInput.addEventListener("change", calcularMigracao);
dataMigracaoInput.addEventListener("change", calcularMigracao);

// Executa o cálculo ao carregar a página
calcularMigracao();
