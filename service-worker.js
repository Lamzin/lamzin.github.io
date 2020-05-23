self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  return self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

self.addEventListener("message", (event, callback) => {
  if (event.data.command == "save") {
    putNotes(event.data.notes);
  }
  if (event.data.command == "load") {
    getNotes();
  }
});

function putNotes(notes) {
  let open = indexedDB.open("notes", 1);

  open.onupgradeneeded = function() {
    let db = open.result;
    db.createObjectStore("note", { autoIncrement: true });
  };

  open.onsuccess = function() {
    let db = open.result;
    let store = db.transaction("note", "readwrite").objectStore("note");
    store.put(notes, 1);
  };
}

function getNotes() {
  let open = indexedDB.open("notes", 1);

  open.onupgradeneeded = function() {
    let db = open.result;
    db.createObjectStore("note", { autoIncrement: true });
  };

  open.onsuccess = function() {
    let db = open.result;
    let store = db.transaction("note", "readwrite").objectStore("note");
    request = store.get(1);

    request.onsuccess = function(event) {
      let notes = event.target.result || "";
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ notes: notes });
        });
      });
    };
  };
}
