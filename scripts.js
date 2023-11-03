// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCp0DnKfWTCfx5zhsia_ejxcxrqdTCCmHM",
    authDomain: "primoflix-8691b.firebaseapp.com",
    databaseURL: "https://primoflix-8691b.firebaseio.com",
    projectId: "primoflix-8691b",
    storageBucket: "primoflix-8691b.appspot.com",
    messagingSenderId: "466298232490",
    appId: "1:466298232490:web:b7667bb30d4653fc943ad3"
  };
  
  // Inicialize o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  
  const numeroRef = database.ref('UltimoNumero');
  const chamadasRef = database.ref('Chamadas'); // Adicionado para buscar as chamadas
  
  let valorAtual = null;
  let intervalo = null;
  let chamadas = []; // Vai armazenar as chamadas
  
  // Função para atualizar o contador
  function atualizarContador(valor) {
    document.getElementById('valorContador').innerText = valor;
  }
  
  // Função para atualizar a chamada aleatoriamente
  function atualizarChamada() {
    if (chamadas.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * chamadas.length);
      const chamadaSelecionada = chamadas[indiceAleatorio];
      document.getElementById('chamadaTitulo').innerText = chamadaSelecionada;
    }
  }
  
  // Escutar as mudanças no campo UltimoNumero no Firebase
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
  
  // Escutar as mudanças no campo Chamadas no Firebase
  chamadasRef.on('value', function(snapshot) {
    chamadas = snapshot.val();
    atualizarChamada(); // Atualize imediatamente com uma nova chamada
  });
  
  // Atualizar a chamada a cada 10 segundos
  setInterval(atualizarChamada, 10000);
  