/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
  navigator.serviceWorker.addEventListener("message", onTextAreaLoad);
}

window.addEventListener("DOMContentLoaded", e => {
  document.getElementById("mainTextArea").addEventListener("input", event => {
    onTextAreaChange();
  });
  requestTextAreaNote();
});

function requestTextAreaNote() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  if (!navigator.serviceWorker.controller) {
    return;
  }

  navigator.serviceWorker.controller.postMessage({
    command: "load"
  });
}

function onTextAreaLoad(event) {
  document.getElementById("mainTextArea").value = event.data.notes;
}

function onTextAreaChange() {
  let notes = document.getElementById("mainTextArea").value;

  if (!("serviceWorker" in navigator)) {
    console.log("Service worker is not supported");
    return;
  }
  if (!navigator.serviceWorker.controller) {
    console.log("This page is not currently controlled by a service worker.");
    return;
  }

  navigator.serviceWorker.controller.postMessage({
    command: "save",
    notes: notes
  });
}
