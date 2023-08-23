import GameBoard from "./view/Board/Board";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center">
      <h1 className="py-2">Dark Knight</h1>
      <GameBoard />
    </div>
  );
}

export default App;
