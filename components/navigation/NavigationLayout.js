import Navigation from "./Navigation";
import FooterBottom from "../footer/index";

const NavigationLayout = ({ children }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <section>{children}</section>
      </main>
      <footer>
        <FooterBottom />
      </footer>
    </>
  );
};
export default NavigationLayout;
