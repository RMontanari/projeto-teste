document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:8080/api/agendamentos/listar";
  const itemsPerPage = 5; // Número de itens por página
  let currentPage = 1; // Página atual
  let agendamentos = []; // Array para armazenar os agendamentos

  let totalAgendamentos = 0;
  let confirmados = 0;

  async function fetchAgendamentos() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Erro ao carregar os agendamentos.");
      }
      const data = await response.json();
      agendamentos = data;

      // Calcula os valores de progresso fora da renderização
      totalAgendamentos = agendamentos.length;
      confirmados = agendamentos.filter(
        (agendamento) => agendamento.statusAgendamento.nome === "Confirmado"
      ).length;

      // Atualiza a barra de progresso com os valores calculados
      atualizarProgressBar(confirmados, totalAgendamentos);

      renderTable(); // Renderiza a tabela com os agendamentos atuais
    } catch (error) {
      console.error("Erro ao buscar os agendamentos:", error);
    }
  }

  function renderTable() {
    const tbody = document.getElementById("procedures-tbody");
    tbody.innerHTML = ""; // Limpa qualquer conteúdo existente

    // Calcula o índice inicial e final dos itens a serem exibidos na página atual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    agendamentos.slice(startIndex, endIndex).forEach((agendamento) => {
      const tr = document.createElement("tr");

      // Data/Hora
      const dataHoraTd = document.createElement("td");
      dataHoraTd.textContent = `${new Date(
        agendamento.data
      ).toLocaleDateString()} ${new Date(
        agendamento.horario
      ).toLocaleTimeString()}`;
      tr.appendChild(dataHoraTd);

      // Cliente
      const clienteTd = document.createElement("td");
      clienteTd.textContent = agendamento.usuario.nome;
      tr.appendChild(clienteTd);

      // Procedimento
      const procedimentoTd = document.createElement("td");
      procedimentoTd.textContent = agendamento.procedimento.tipo;
      tr.appendChild(procedimentoTd);

      // Especificação
      const especificacaoTd = document.createElement("td");
      especificacaoTd.textContent = agendamento.procedimento.descricao;
      tr.appendChild(especificacaoTd);

      // Status
      const statusTd = document.createElement("td");
      statusTd.textContent = agendamento.statusAgendamento.nome;
      tr.appendChild(statusTd);

      // Ações
      const acoesTd = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.classList.add("edit-btn");
      editButton.dataset.id = agendamento.idAgendamento;
      editButton.innerHTML = '<i class="fas fa-edit"></i>';
      editButton.addEventListener("click", () =>
        editarAgendamento(agendamento.idAgendamento)
      );

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.dataset.id = agendamento.idAgendamento;
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.addEventListener("click", () =>
        excluirAgendamento(agendamento.idAgendamento)
      );

      acoesTd.appendChild(editButton);
      acoesTd.appendChild(deleteButton);
      tr.appendChild(acoesTd);

      tbody.appendChild(tr);
    });

    // Atualiza a paginação
    const totalPages = Math.ceil(totalAgendamentos / itemsPerPage);
    document.getElementById("current-page").textContent = currentPage;
    document.getElementById("total-pages").textContent = totalPages;

    // Habilita ou desabilita os botões de próxima e página anterior conforme necessário
    const prevPageBtn = document.getElementById("prev-page-btn");
    const nextPageBtn = document.getElementById("next-page-btn");

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
  }

  function atualizarProgressBar(confirmados, total) {
    const progress = document.getElementById("progress");
    const percentage = total === 0 ? 0 : (confirmados / total) * 100;
    progress.style.width = `${percentage}%`;

    // Atualiza os rótulos com os números
    document.getElementById(
      "progress-label"
    ).textContent = `Atendimentos Confirmados: ${confirmados}`;
    document.getElementById(
      "total-label"
    ).textContent = `Atendimentos Totais: ${total}`;
  }

  // Eventos para navegação entre páginas
  document.getElementById("prev-page-btn").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable();
    }
  });

  document.getElementById("next-page-btn").addEventListener("click", () => {
    const totalPages = Math.ceil(agendamentos.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderTable();
    }
  });

  // Inicializa a página
  fetchAgendamentos();
});

// Funções para edição e exclusão
function editarAgendamento(id) {
  window.location.href = `agendamento-forms/editar-agendamento/editar-agendamento.html?id=${id}`;
}

function excluirAgendamento(id) {
  if (confirm("Deseja realmente excluir o agendamento?")) {
    // Implementar a lógica de exclusão do agendamento aqui
    alert("Agendamento excluído com sucesso!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const nome = localStorage.getItem("nome");
  const email = localStorage.getItem("email");

  if (nome && email) {
    document.getElementById("userName").textContent = nome;
    document.getElementById("userEmail").textContent = email;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Evento para abrir o modal de exclusão
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const agendamentoInfo = this.getAttribute("data-info"); // Supondo que você passe algumas informações do agendamento via atributo data
      document.getElementById("agendamento").innerText = agendamentoInfo;
      document.getElementById("modal").style.display = "block";
    });
  });

  // Evento para abrir o modal de salvar status
  const saveStatusButton = document.querySelector(
    ".actions button:nth-child(4)"
  ); // Supondo que este é o botão para criar status
  saveStatusButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("save-modal").style.display = "block";
  });

  // Evento para fechar os modais
  document.querySelector(".btn-no").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
    document.getElementById("save-modal").style.display = "none";
  });

  document
    .querySelector(".modal-content2 .btn-no")
    .addEventListener("click", function () {
      document.getElementById("save-modal").style.display = "none";
    });

  document.querySelector(".btn-save").addEventListener("click", function () {
    // Adicione a lógica para salvar o status aqui
    document.getElementById("save-modal").style.display = "none";
  });
});

let agendamentoIdToDelete = null;

function excluirAgendamento(id) {
  // Armazena o ID do agendamento a ser excluído
  agendamentoIdToDelete = id;

  // Atualiza o conteúdo do modal
  const procedimento = document.getElementById("procedimento");
  procedimento.textContent = `ID do agendamento: ${id}`; // Ou outras informações relevantes

  // Exibe o modal
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  // Oculta o modal
  document.getElementById("modal").style.display = "none";
}

function confirmDeletion() {
  // Lógica para excluir o agendamento
  if (agendamentoIdToDelete !== null) {
    console.log(`Excluir agendamento com ID: ${agendamentoIdToDelete}`);
    // Aqui você pode fazer uma chamada para o servidor ou executar a exclusão
    // Exemplo: api.deleteAgendamento(agendamentoIdToDelete);

    // Limpa a variável de ID e oculta o modal
    agendamentoIdToDelete = null;
    closeModal();

    // Recarrega a tabela
    renderTable();
  }
}

function openEditModal() {
  // Exibe o modal de edição
  document.getElementById("edit-modal").style.display = "block";
}

function closeEditModal() {
  // Oculta o modal de edição
  document.getElementById("edit-modal").style.display = "none";
}

function saveStatus() {
  // Lógica para salvar as alterações
  const nome = document.getElementById("edit-nome").value;
  const cor = document.getElementById("edit-cor").value;

  console.log(`Salvar Status - Nome: ${nome}, Cor: ${cor}`);

  // Aqui você pode fazer uma chamada para o servidor para salvar os dados
  // Exemplo: api.saveStatus({ nome, cor });

  // Após salvar, fecha o modal
  closeEditModal();

  // Recarregar a tabela ou fazer outras atualizações necessárias
  renderTable();
}

// Adiciona o evento de clique ao botão de salvar
document.querySelector(".btn-save").addEventListener("click", saveStatus);

document.addEventListener("DOMContentLoaded", function () {
  // Evento para abrir o modal de filtro
  document
    .getElementById("openFilterModalBtn")
    .addEventListener("click", function () {
      document.getElementById("filter-modal").style.display = "block";
    });

  // Funções para abrir e fechar o modal de filtro
  window.closeFilterModal = function () {
    document.getElementById("filter-modal").style.display = "none";
  };

  window.applyFilter = function () {
    // Implementar a lógica de filtro aqui
    console.log("Filtro aplicado");
    closeFilterModal();
  };
});

// Referências aos elementos do DOM
const openStatusModalButton = document.getElementById("open-status-modal");
const statusModal = document.getElementById("status-modal");
const closeStatusModalButton = document.querySelector(".close");

// Função para abrir o modal de Status Cadastrados
function openStatusModal() {
  statusModal.style.display = "block";
}

// Função para fechar o modal de Status Cadastrados
function closeStatusModal() {
  statusModal.style.display = "none";
}

// Adiciona o event listener ao botão para abrir o modal
openStatusModalButton.addEventListener("click", openStatusModal);

// Função para fechar o modal quando o usuário clica fora dele
window.onclick = function (event) {
  if (event.target === statusModal) {
    statusModal.style.display = "none";
  }
};

// Adicionar chamadas às funções de abrir e fechar modais de exclusão e edição dentro do renderStatuses
function attachEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteStatusId = e.target.getAttribute("data-id");
      const status = allStatuses.find((status) => status.id == deleteStatusId);
      procedimentoText.innerText = status.nome;
      openModal();
    });
  });

  const editButtons = document.querySelectorAll(".edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      editStatusId = e.target.getAttribute("data-id");
      const status = allStatuses.find((status) => status.id == editStatusId);
      editNome.value = status.nome;
      editCor.value = status.cor;
      openEditModal();
    });
  });
}
