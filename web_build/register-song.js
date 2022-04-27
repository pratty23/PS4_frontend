/* eslint-env browser */
//edit this to register song with rankings
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/expo-service-worker.js', { scope: '/' })
        .then(function (info) {
          // console.info('Registered service-worker', info);
        })
        .catch(function (error) {
          console.info('Failed to register service-worker', error);
        });
    });
  }