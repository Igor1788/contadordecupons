const firebaseConfig = {
  apiKey: "AIzaSyCp0DnKfWTCfx5zhsia_ejxcxrqdTCCmHM",
  authDomain: "primoflix-8691b.firebaseapp.com",
  databaseURL: "https://primoflix-8691b.firebaseio.com",
  projectId: "primoflix-8691b",
  storageBucket: "primoflix-8691b.appspot.com",
  messagingSenderId: "466298232490",
  appId: "1:466298232490:web:b7667bb30d4653fc943ad3"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const numeroRef = database.ref('lancamento/5');
const chamadasRef = database.ref('Chamadas'); 

let valorAtual = null;
let intervalo = null;
let chamadas = []; 

function atualizarContador(valor) {
  document.getElementById('valorContador').innerText = valor;
  const percentual = (valor - 1) / (200 - 1); 
  document.getElementById('barraProgresso').style.width = percentual * 100 + '%'; 
}


function atualizarChamada() {
  if (chamadas.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * chamadas.length);
    const chamadaSelecionada = chamadas[indiceAleatorio];
    document.getElementById('chamadaTitulo').innerText = chamadaSelecionada;
  }
}


numeroRef.on('value', function(snapshot) {
  const novoValor = snapshot.val();
  if (valorAtual === null) {
    valorAtual = novoValor;
    atualizarContador(valorAtual);
  } else {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(() => {
      if (valorAtual < novoValor) {
        valorAtual++;
      } else if (valorAtual > novoValor) {
        valorAtual--;
      } else {
        clearInterval(intervalo);
      }
      atualizarContador(valorAtual);
    }, 500);
  }
});


chamadasRef.on('value', function(snapshot) {
  chamadas = snapshot.val();
  atualizarChamada(); 
});

// Novo listener para a referência de lançamento
lancamentoRef.on('value', function(snapshot) {
  const valorLancamento = snapshot.val();
  // Supondo que valorLancamento seja um objeto com um campo numérico que você deseja usar
  const novoValor = valorLancamento.numero; // Ajuste este caminho conforme a estrutura de dados
  if (valorAtual === null) {
    valorAtual = novoValor;
    atualizarContador(valorAtual);
  } else {
    if (intervalo) clearInterval(intervalo);
    intervalo = setInterval(() => {
      if (valorAtual < novoValor) {
        valorAtual++;
      } else if (valorAtual > novoValor) {
        valorAtual--;
      } else {
        clearInterval(intervalo);
      }
      atualizarContador(valorAtual);
    }, 500);
  }
});


setInterval(atualizarChamada, 10000);
