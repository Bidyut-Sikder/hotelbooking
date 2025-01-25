import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
       <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SearchBar />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {children}
      </div>
      <Footer /> 
    </div>
  );
}

export default Layout;

{
  /* <div className="flex flex-col min-h-screen">
  header/
  hero
<div className="container mx-auto">
  searchbar
</div>
<div className="container mx-auto py-10 flex-1">{children}</div>
footer
</div> */
}

{
  /* <div className="flex flex-col min-h-screen">
global header 
<Hero />
<div className="container mx-auto">
 global main search bar 
</div>
<div className="container mx-auto py-10 flex-1">{children}</div>
global  main footer component
</div> */
}


