function getDB() {
  return new Promise((resolve, reject) => {
    let self = window;
    var request = self.indexedDB.open('EXAMPLE_DB', 1);
    let db;
    request.onsuccess = function(event) {
      console.log('[onsuccess]', request.result);
      db = event.target.result; // === request.result
      resolve(db);
    };
    request.onerror = function(event) {
      console.log('[onerror]', request.error);
      reject(request.error);
    };
    request.onupgradeneeded = function(event) {
      var db = event.target.result;
      var store = db.createObjectStore('products', { keyPath: 'id' });
    };
  });
}
async function loadIndexedDB() {
  try {
    if (!window.indexedDB) {
      console.log('IndexedDB is not supported');
      return;
    }
    let db = await getDB();
    return db;
  } catch (error) {}
}
async function addStuff() {
  let db = await loadIndexedDB();
  let txn = db.transaction('products', 'readwrite');
  console.log(txn);
  txn.onsuccess = () => console.log('transaction created!');
  let obs = txn.objectStore('products');
  let addReq = obs.add({ id: 4, name: 'Red Men T-Shirt', price: '$3.99' });
  addReq.onsuccess = e => {
    alert('check the indexedDB section!')
    console.log('inserted successfully', e.target.result);
  };
  addReq.onerror = e => console.error(e);
}
async function getStuff() {
  let db = await loadIndexedDB();
  let txn = db.transaction('products', 'readwrite');
  txn.onsuccess = () => console.log('transaction created!');
  let obs = txn.objectStore('products');
  let addReq = obs.get(1);
  addReq.onsuccess = e => {
    alert('check the indexedDB section!')
    console.log('fetched successfully', e.target.result);
  };
  addReq.onerror = e => console.error(e);
}
// addStuff();
getStuff();
