export function popUp(menu, btnAbrir, funcao) {
  const abrir = function() {
      menu.classList.add("ativo");
      overlay.classList.add("ativo");
      if (typeof funcao === "function") funcao();
  };

  const fechar = function() {
      menu.classList.remove("ativo");
      overlay.classList.remove("ativo");
  };

  btnAbrir.onclick = function(e) {
      e.stopPropagation();
      abrir();
  };

  overlay.onclick = fechar;

  document.addEventListener("click", function(e) {
      if (menu.classList.contains("ativo") && !menu.contains(e.target) && e.target !== btnAbrir) {
          fechar();
      }
  });

  document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") fechar();
  });

  menu.onclick = function(e) { e.stopPropagation(); };
}