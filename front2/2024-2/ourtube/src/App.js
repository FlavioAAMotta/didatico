import Header from "./components/header/Header";
import Section from "./components/section/Section";
import Nav from "./components/nav/Nav";
import { StyledBody } from "./StyledBody";
import { StyledMain } from "./StyledMain";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <StyledBody>
      <Header />
      <StyledMain>
        <Nav />
        <Section />
      </StyledMain>
      <Footer />
    </StyledBody>
  );
}

export default App;
