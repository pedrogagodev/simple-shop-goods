
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { totalItems } = useCart();
  
  return (
    <nav className="bg-primary text-primary-foreground py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Fashion Store</Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/products" className="hover:underline">Produtos</Link>
          <Link to="/cart" className="relative">
            <Button variant="secondary" size="sm" className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span>Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
