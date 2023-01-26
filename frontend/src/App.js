import './App.css';

function App() {

  // const button = document.querySelector("button")

  function startSession () {
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch(e => {
        console.error(e.error)
      }) 
  }
  
  return (
    <div className="App">
      test
      <button onClick={() => startSession()}>starta</button>
    </div>
  );
}

export default App;