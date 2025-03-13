import CartSidebar from "@/components/CartSidebar";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <CartSidebar />
      <Searchbar />
      <main>
        <ProductGrid />
      </main>
    </>
  );
}
