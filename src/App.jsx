import React from "react";
import { DataGrid/* , ruRU */ } from '@material-ui/data-grid';
import { ruRU } from '@material-ui/core/locale';

function App() {
  const likes = 0
  return <div className="App">
    <p>{likes}</p>
    <button>increment</button>
    <button>decrement</button>
  </div>;
}

export default App;
