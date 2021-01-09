import React, {useEffect, useState} from 'react';
import './App.css'
function App() {

  const [books, setBooks] = useState([]);
  useEffect(()=> {

    setInterval(() => {
      fetch("/api/books")
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        setBooks(data)
      })
    }, 2000);
  
  }, [])

  const addBook = ()=> {
    const title = prompt("Enter Book title");
    const author = prompt("Enter Book author");

    fetch("/api/add", {
    method: 'POST',
    body: JSON.stringify({author, title})
    
  } ).then(res=> res.json).then(data => {
    console.log(data)
  })
} 

  
  if(!books.length)
    return <h2>Loading!!!</h2>

  return (
    <div className="App">
      <h1>Books: </h1>
      <ul>
        {books.map(book => {
          return(
            <li>
              
             <h2>Author : </h2> {book.author} <br />
              <h2>Book name:</h2> {book.title}
            </li>
          )
        })}
      </ul>
      <button onClick={addBook} className="btn">Add Book</button>
    </div>
  );
}

export default App;
