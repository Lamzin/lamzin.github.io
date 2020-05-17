/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

window.addEventListener("beforeinstallprompt", event => {
  console.log("beforeinstallprompt", event);
});
