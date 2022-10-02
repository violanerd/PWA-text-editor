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


export const putDb = async (content) => {//console.log('put not created');

  console.log('Post in database');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', "readwrite");
  const store = tx.objectStore('jate')
  const request = store.add({content: content})
  const result = await request;
  console.log('data saved to the database', result);
}


export const getDb = async () => {//console.log('get not created');
// {
  console.log('GET from the database');
  const contactDb = await openDB('jate', 1);
  const tx = contactDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  // test code
  //tried to get get? the answer is here
  // end test code
  const request = store.getAll(); //instead of get all??? how to get it to set initially instead of null
  // maybe an if statement?
  const result = await request;
  console.log('result.value', result)
  if (result.length===0){
    return undefined
  } else {
    return result[result.length-1].content
  }
  //return result.content this makes the local storage work because it breaks it. LOL. Maybe not get all but get last?
}

initdb();
