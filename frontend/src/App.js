import './App.css';

function App() {

  function startSession () {
    fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 3, name: 'learn somenthing from frontend', priceInCents: 700 },
          { id: 2, quantity: 2, name: '2 somenthing from frontend', priceInCents: 600 },
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
