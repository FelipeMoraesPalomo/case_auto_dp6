// Preencha este arquivo com qualquer código que você necessite para realizar a
// coleta, desde a biblioteca analytics.js, gtag.js ou o snippet do Google Tag 
// Manager. No último caso, não é necessário implementar a tag <noscript>.
// O ambiente dispõe da jQuery 3.5.1, então caso deseje, poderá utilizá-la
// para fazer a sua coleta.
// Caso tenha alguma dúvida sobre o case, não hesite em entrar em contato.
window.dataLayer = window.dataLayer || [];

document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#form_contato');
    const button_submit = document.querySelector('#button_submit');
    let formStarted = false;
  
    if (formulario) {
      const camposDoFormulario = formulario.querySelectorAll('input, textarea, select');
  
      camposDoFormulario.forEach(campo => {
        campo.addEventListener('focus', handleFirstInteraction);
        campo.addEventListener('input', handleFirstInteraction);
      });
  
      function handleFirstInteraction(event) {
        if (!formStarted) {
          formStarted = true;
          // Enviar um evento para o dataLayer com parâmetros
          window.dataLayer.push({
            'event': 'form_start', // Nome do evento personalizado
            'form_id': formulario.id,  // ID 
            'form_name': formulario.name, // name
            'form_destination': formulario.action // destino
          });
  
          // Remover os listeners para não disparar novamente
          camposDoFormulario.forEach(c => {
            c.removeEventListener('focus', handleFirstInteraction);
            c.removeEventListener('input', handleFirstInteraction);
          });
        }
      }

    if(button_submit){
        button_submit.addEventListener('click', pushSubmit)

        function pushSubmit(event){
            window.dataLayer.push({
                'event': 'form_submit', // Nome do evento personalizado
                'form_id': formulario.id,  // ID 
                'form_name': formulario.name, // name
                'form_destination': formulario.action, // destino
                'form_submit_text': button_submit.textContent // texto do botao
            });
        }
    }

    // Observer para detectar a abertura do popup
    const target = document.body;

    const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === 'class') {
        const classList = target.classList;
        if (classList.contains('lightbox-open')) {
            // Disparo no dataLayer
            window.dataLayer.push({
            'event': 'view_form_success',
            'form_id': formulario.id,
            'form_name': formulario.name
            });
        }
        }
    });
    });

    // Configura o observer para escutar mudanças de atributos
    observer.observe(target, {
    attributes: true,
    attributeFilter: ['class']
    });

      
    }
  });

  

