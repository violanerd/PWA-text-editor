import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log('Post in database');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', "readwrite");
  const store = tx.objectStore('jate')
  const request = store.add({content: content})
  const result = await request;
  console.log('data saved to the database', result);
}


export const getDb = async () => {
  console.log('GET from the database');
    // Create a connection to the IndexedDB database and the version we want to use.
  const contactDb = await openDB('jate', 1);
    // Create a new transaction and specify the store and data privileges.
  const tx = contactDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
    // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  const result = await request;
  console.log('result.value', result)
  return result
}

initdb();
