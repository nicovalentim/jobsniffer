export function popUp(menu, btnAbrir, funcao) {
  const abrir = function() {
      menu.classList.add("ativo");
      if (typeof overlay !== 'undefined' && overlay) overlay.classList.add("ativo");
      if (typeof funcao === "function") funcao();
  };

  const fechar = function() {
      menu.classList.remove("ativo");
      if (typeof overlay !== 'undefined' && overlay) overlay.classList.remove("ativo");
  };

  if (btnAbrir) {
      btnAbrir.onclick = function(e) {
          e.stopPropagation();
          abrir();
      };
  } else {
      abrir();
  }

  if (typeof overlay !== 'undefined' && overlay) {
      overlay.onclick = fechar;
  }

  document.addEventListener("click", function(e) {
      const clicouNoBotao = btnAbrir && e.target === btnAbrir;
      
      if (menu.classList.contains("ativo") && !menu.contains(e.target) && !clicouNoBotao)
          fechar();
  });

  document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") fechar();
  });

  menu.onclick = function(e) { e.stopPropagation(); };
}