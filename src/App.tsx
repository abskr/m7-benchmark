import Navigator from "./components/Navigator";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import styled from 'styled-components'


function App() {
  return (
    <Router>
      <Container>
        <Navigator />
        <Route
          path='/'
          exact
          render={(routerProps) => <Homepage {...routerProps} />}
        />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: blue
`

export default App;
