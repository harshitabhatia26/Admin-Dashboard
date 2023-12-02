import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import "./app.css"
import Userlist from "./components/userlist/userlist";

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <Sidebar />
        <Userlist />
    </div>
    </div>
  );
}

export default App;
