import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContext"
import { ThemeContextProvider } from "./contexts/ThemeContext"
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/rooms/new" component={NewRoom}/>
              <Route path="/rooms/:id" component={Room}/>
            </Switch>
          </AuthContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
  );
}

export default App;
