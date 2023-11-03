// Configuração do Firebase (substitua pelos valores reais do seu projeto)
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

  let valorAtual = null;
  let intervalo = null;
  
  numeroRef.on('value', function(snapshot) {
    const novoValor = snapshot.val();
    if (valorAtual === null) {
      valorAtual = novoValor; // Defina o valor inicial se for a primeira vez
      atualizarContador(valorAtual);
    } else {
      if (intervalo) {
        clearInterval(intervalo); // Limpe o intervalo existente se estiver contando
      }
      intervalo = setInterval(() => {
        if (valorAtual < novoValor) {
          valorAtual++;
          atualizarContador(valorAtual);
        } else if (valorAtual > novoValor) {
          valorAtual--;
          atualizarContador(valorAtual);
        } else {
          clearInterval(intervalo); // Limpe o intervalo quando chegar ao novo valor
        }
      }, 500); // Atualiza a cada meio segundo
    }
  });
  
  function atualizarContador(valor) {
    document.getElementById('valorContador').innerText = valor;
  }
  