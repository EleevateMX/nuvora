/* Nuvora kit: logo, mascotas e íconos dibujados según el Manual de marca v2.
   Formas planas, sin sombras ni degradados. Los colores salen de la paleta oficial. */
(function () {
  var C = {
    profundo: '#0A2B2C', verde: '#157A6E', mandarina: '#FF8A3D', uva: '#5B3FB8',
    crema: '#F3F4EE', gris: '#4D5E5C', linea: '#DEE2D9',
    tVerde: '#E3F0EC', tMandarina: '#FFE8D8', tUva: '#ECE8F8', blanco: '#FFFFFF'
  };

  /* Elenco: cada mascota con su color, su tinta y su rasgo. No se cambian. */
  var ELENCO = {
    nuvi: { color: C.mandarina, ink: C.profundo, mark: 'sprout' },
    vora: { color: C.verde, ink: C.profundo, mark: 'part' },
    rumi: { color: C.profundo, ink: C.blanco, mark: 'glasses' },
    kora: { color: C.uva, ink: C.blanco, mark: 'star' }
  };

  function mascota(nombre, opts) {
    opts = opts || {};
    var m = ELENCO[nombre];
    var face = opts.face || 'smile', pose = opts.pose || 'idle', size = opts.size || 120;
    var col = m.color, ink = m.ink, mark = m.mark;
    var L = { down: ['M14 50 Q2 60 4 74', [4, 74]], up: ['M14 46 Q-4 38 -4 16', [-4, 16]], hip: ['M14 42 Q-8 52 10 64', null], out: ['M14 52 Q0 54 -14 48', [-14, 48]] };
    var R = { down: ['M86 50 Q98 60 96 74', [96, 74]], up: ['M86 46 Q104 38 104 16', [104, 16]], hip: ['M86 42 Q108 52 90 64', null], out: ['M86 52 Q100 54 116 46', [116, 46]] };
    var P = { idle: ['down', 'down'], wave: ['down', 'up'], cheer: ['up', 'up'], point: ['down', 'out'], hips: ['hip', 'hip'], open: ['out', 'out'] }[pose] || ['down', 'down'];
    var a = [L[P[0]], R[P[1]]];
    var s = '<svg class="mascota" role="img" aria-label="' + nombre.charAt(0).toUpperCase() + nombre.slice(1) + '" width="' + size + '" height="' + size + '" viewBox="-16 -22 134 120" style="display:block;overflow:visible">';
    a.forEach(function (x) { s += '<path d="' + x[0] + '" stroke="' + col + '" stroke-width="11" stroke-linecap="round" fill="none"/>'; });
    a.forEach(function (x) { if (x[1]) s += '<circle cx="' + x[1][0] + '" cy="' + x[1][1] + '" r="8" fill="' + col + '"/>'; });
    s += '<rect x="28" y="76" width="13" height="18" rx="6" fill="' + col + '"/><rect x="59" y="76" width="13" height="18" rx="6" fill="' + col + '"/>';
    s += '<ellipse cx="32" cy="95" rx="11" ry="5" fill="' + col + '"/><ellipse cx="68" cy="95" rx="11" ry="5" fill="' + col + '"/>';
    if (mark === 'sprout') s += '<path d="M50 8 L50 -4" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/><path d="M50 -3 Q38 -15 30 -5 Q40 1 50 -3 Z" fill="' + col + '"/><path d="M50 -3 Q62 -15 70 -5 Q60 1 50 -3 Z" fill="' + col + '"/>';
    if (mark === 'star') s += '<path d="M50 8 L50 -2" stroke="' + col + '" stroke-width="4" stroke-linecap="round"/><path d="M50 -20 L53.5 -12.5 L61.5 -11.5 L55.5 -6 L57 2 L50 -2 L43 2 L44.5 -6 L38.5 -11.5 L46.5 -12.5 Z" fill="' + C.mandarina + '"/>';
    s += '<rect x="8" y="6" width="84" height="76" rx="24" fill="' + col + '"/>';
    if (mark === 'part') s += '<path d="M18 22 Q30 4 64 10 Q40 12 22 30 Z" fill="' + ink + '" opacity="0.16"/>';
    s += '<circle cx="24" cy="54" r="6" fill="' + ink + '" opacity="0.14"/><circle cx="76" cy="54" r="6" fill="' + ink + '" opacity="0.14"/>';
    var happy = face === 'happy';
    if (!happy) s += '<circle cx="36" cy="40" r="6" fill="' + ink + '"/>';
    else s += '<path d="M29 41 Q36 33 43 41" stroke="' + ink + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    if (face === 'smile' || face === 'wow' || face === 'calm') s += '<circle cx="64" cy="40" r="6" fill="' + ink + '"/>';
    else s += '<path d="M57 41 Q64 33 71 41" stroke="' + ink + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    if (mark === 'glasses') s += '<circle cx="36" cy="40" r="11" stroke="' + ink + '" stroke-width="3" fill="none"/><circle cx="64" cy="40" r="11" stroke="' + ink + '" stroke-width="3" fill="none"/><path d="M47 40 L53 40" stroke="' + ink + '" stroke-width="3"/>';
    if (face === 'smile' || face === 'wink') s += '<path d="M38 58 Q50 69 62 58" stroke="' + ink + '" stroke-width="5" stroke-linecap="round" fill="none"/>';
    if (happy) s += '<path d="M34 55 Q50 55 66 55 Q62 72 50 72 Q38 72 34 55 Z" fill="' + ink + '"/>';
    if (face === 'wow') s += '<circle cx="50" cy="61" r="6" fill="' + ink + '"/>';
    if (face === 'calm') s += '<path d="M41 60 L59 60" stroke="' + ink + '" stroke-width="5" stroke-linecap="round"/>';
    return s + '</svg>';
  }

  /* Símbolo: tres bloques base + el módulo abajo a la derecha.
     variante: 'positivo' (bloques profundo), 'negativo' (bloques blancos),
     'mandarina' (sobre fondo mandarina: bloques profundo, módulo blanco). Nunca lleva cara. */
  function simbolo(variante, size) {
    var base = variante === 'negativo' ? C.blanco : C.profundo;
    var mod = variante === 'mandarina' ? C.blanco : C.mandarina;
    return '<svg class="simbolo" aria-hidden="true" width="' + size + '" height="' + size + '" viewBox="0 0 56 56" fill="none">' +
      '<rect x="4" y="4" width="22" height="22" rx="6" fill="' + base + '"/><rect x="30" y="4" width="22" height="22" rx="6" fill="' + base + '"/>' +
      '<rect x="4" y="30" width="22" height="22" rx="6" fill="' + base + '"/><rect x="30" y="30" width="22" height="22" rx="6" fill="' + mod + '"/></svg>';
  }

  function logo(variante, size) {
    size = size || 32;
    var txt = variante === 'negativo' ? C.blanco : C.profundo;
    return '<span class="logo" aria-label="nuvora" style="display:inline-flex;align-items:center;gap:' + Math.round(size * 0.28) + 'px;color:' + txt + '">' +
      simbolo(variante, Math.round(size * 1.15)) +
      '<span style="font-family:\'Albert Sans\',Arial,sans-serif;font-weight:700;font-size:' + size + 'px;letter-spacing:-0.03em;line-height:1">nuvora</span></span>';
  }

  /* Íconos de módulo: trazo 2 px, retícula 24 px, puntas redondas, una tinta. */
  var ICONOS = {
    caja: '<rect x="3" y="10" width="18" height="10" rx="2"/><path d="M7 10V5h10v5"/><path d="M8 15h8"/>',
    ventas: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
    reportes: '<path d="M5 20V12"/><path d="M12 20V5"/><path d="M19 20v-9"/>',
    inventario: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5"/><path d="M12 13v8"/>',
    facturacion: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h7"/><path d="M9 17h5"/>',
    pagos: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/><path d="M7 15h3"/>',
    lealtad: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    sucursales: '<path d="M4 10l1.5-5h13L20 10"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>'
  };
  function icono(nombre, size) {
    size = size || 24;
    return '<svg aria-hidden="true" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="' + C.profundo + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONOS[nombre] + '</svg>';
  }

  /* Pinta cualquier elemento con data-mascota / data-logo / data-icono. */
  function pintar(root) {
    (root || document).querySelectorAll('[data-mascota]').forEach(function (el) {
      el.innerHTML = mascota(el.dataset.mascota, { face: el.dataset.face, pose: el.dataset.pose, size: +el.dataset.size || 120 });
    });
    (root || document).querySelectorAll('[data-logo]').forEach(function (el) {
      el.innerHTML = logo(el.dataset.logo, +el.dataset.size || 28);
    });
    (root || document).querySelectorAll('[data-simbolo]').forEach(function (el) {
      el.innerHTML = simbolo(el.dataset.simbolo, +el.dataset.size || 32);
    });
    (root || document).querySelectorAll('[data-icono]').forEach(function (el) {
      el.innerHTML = icono(el.dataset.icono, +el.dataset.size || 24);
    });
  }

  window.Nuvora = { C: C, mascota: mascota, logo: logo, simbolo: simbolo, icono: icono, pintar: pintar };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { pintar(); });
  else pintar();
})();
