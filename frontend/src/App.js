import logo from "./logo.svg";
import "./App.css";
import Header from "./component/header";
import Chatroom from "./component/chatroom";
function App() {
  return (
    <div className="App">
      <Header />
      <Chatroom />
    </div>
  );
}

export default App;
