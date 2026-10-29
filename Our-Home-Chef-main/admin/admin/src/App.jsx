import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import RecipeSimulation from './Components/Recipe/recipe';

function App() {
  return (
  
     <div className="app" style={{backgroundColor:"whitesmoke"}}>
     <Navbar />
      <Admin />
      
      
    </div>
  );
}

export default App;