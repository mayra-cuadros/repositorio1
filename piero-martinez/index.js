// Clave para guardar las notas en localStorage
const STORAGE_KEY = 'notas_piero_v1';

// Traigo los elementos del DOM
const startBtn = document.getElementById('startBtn');
const launcher = document.getElementById('launcher');
const app = document.getElementById('app');
const backBtn = document.getElementById('backBtn');
const searchInput = document.getElementById('search');
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const saveBtn = document.getElementById('saveBtn');
const cancelEdit = document.getElementById('cancelEdit');
const notesList = document.getElementById('notesList');

// variables de estado
let notes = [];
let editingId = null;

// Cargar notas guardadas
function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    notes = raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error leyendo localStorage', e);
    notes = [];
  }
}

// Guardar notas en localStorage
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Generar un ID único para cada nota
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

// Evitar que el texto HTML rompa el diseño
function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// Acortar texto si es muy largo
function truncate(text, max) {
  if (!text) return '';
  return text.length <= max ? text : text.slice(0, max - 1) + '…';
}

// Mostrar notas en pantalla
function renderNotes(filter = '') {
  notesList.innerHTML = '';
  const q = filter.trim().toLowerCase();
  const filtered = notes
    .filter(n => !q || (n.title + ' ' + n.body).toLowerCase().includes(q))
    .sort((a,b) => b.updatedAt - a.updatedAt);
  if (filtered.length === 0) {
    notesList.innerHTML = `<div class="p-6 bg-white/50 border border-slate-300 rounded-md text-slate-500">
      Aqui se mostrarán las notas.
    </div>`;
  } else {
    filtered.forEach(note => {
      const item = document.createElement('article');
      item.className = 'p-4 bg-white/50 border border-slate-300 rounded-md flex flex-col sm:flex-row sm:items-start gap-3';
      item.innerHTML = `
        <div class="flex-1">
          <h3 class="font-semibold text-slate-900">${escapeHtml(note.title || '(sin título)')}</h3>
          <p class="mt-2 text-slate-700 text-sm whitespace-pre-wrap">${escapeHtml(truncate(note.body || '', 300))}</p>
        </div>
        <div class="flex-shrink-0 flex items-start gap-2">
          <button data-id="${note.id}" class="editBtn px-3 py-1 bg-blue-700 rounded text-sm text-white hover:bg-blue-800 transition">Editar</button>
          <button data-id="${note.id}" class="deleteBtn px-3 py-1 bg-rose-700 rounded text-sm text-white hover:bg-rose-800 transition">Borrar</button>
        </div>
      `;
      notesList.appendChild(item);
    });
    // Agregar eventos a los botones
    notesList.querySelectorAll('.editBtn').forEach(b => b.addEventListener('click', e => startEdit(e.currentTarget.dataset.id)));
    notesList.querySelectorAll('.deleteBtn').forEach(b => b.addEventListener('click', e => deleteNote(e.currentTarget.dataset.id)));
  }
}

// Guardar o actualizar una nota
noteForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const title = noteTitle.value.trim();
  const body = noteBody.value.trim();
  if (!title && !body) return alert('Escribe un título o contenido para la nota.');
  if (editingId) {
    // Editar una nota existente
    const idx = notes.findIndex(n => n.id === editingId);
    if (idx !== -1) {
      notes[idx].title = title;
      notes[idx].body = body;
      notes[idx].updatedAt = Date.now();
    }
  } else {
    // Crear una nueva nota
    notes.push({ id: genId(), title, body, createdAt: Date.now(), updatedAt: Date.now() });
  }
  saveNotes();
  renderNotes(searchInput.value);
  resetForm();
});

// Cargar datos en el formulario para editar
function startEdit(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;
  editingId = id;
  noteTitle.value = note.title;
  noteBody.value = note.body;
  saveBtn.textContent = 'Actualizar';
  noteTitle.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cancelar edición y limpiar formulario
cancelEdit.addEventListener('click', (e) => { e.preventDefault(); resetForm(); });

// Restaurar el formulario al estado inicial
function resetForm() {
  editingId = null;
  noteForm.reset();
  saveBtn.textContent = 'Guardar';
}

// Eliminar una nota
function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  renderNotes(searchInput.value);
}

// Filtrar notas mientras se escribe
searchInput.addEventListener('input', (e) => renderNotes(e.target.value));

// Volver a la página principal
backBtn.addEventListener('click', () => {
  window.location.href = '../index.html';
});

// Inicializar app
(function init() {
  loadNotes();
  renderNotes();
})();
