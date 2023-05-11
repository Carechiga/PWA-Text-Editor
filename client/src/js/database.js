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
  //this creates a new connection to the database and gives it a name and a version number
  const jateDb = await openDB('jate' , 1);
  //this creates a new transaction and sets the priveliges of the database in this case read and write priveliges
  const tx = jateDb.transaction('jate', 'readwrite')
  const store = tx.objectStore('jate');
  //put method updates content of sote
  const request = store.put({jate: content});
  const result = await request;
  console.log("Data added to database!", result);
};

export const getDb = async () => {
   //this creates a new connection to the database and gives it a name and a version number
  const jateDb= await openDB('jate', 1);
  //this creates a new transaction and sets the priveliges of the database in this case read only priveliges
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  //get all methor gets content from db
  const request = store.getAll();
  const result= await request;
  console.log(result);
};

initdb();
