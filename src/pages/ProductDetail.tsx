
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Package2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
          <p className="text-gray-500 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Link to="/products">
            <Button>Voltar para produtos</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
  };
  
  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Por favor, selecione um tamanho");
      return;
    }
    
    addToCart(product, quantity, selectedSize);
    navigate("/cart");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8 flex-1">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden flex items-center justify-center">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package2 className="h-32 w-32 text-primary/30" />
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">
              {product.price.toLocaleString('pt-BR', { 
                style: 'currency', 
                currency: 'BRL' 
              })}
            </p>
            
            <div className="prose prose-slate mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tamanho</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-4 py-2 border rounded-md transition-colors
                      ${selectedSize === size 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-white border-gray-300 hover:border-primary'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantidade</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded-l-md flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <div className="w-16 h-10 border-t border-b flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded-r-md flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Adicionar ao Carrinho
              </Button>
              <Button onClick={handleBuyNow} variant="outline" className="flex-1">
                Comprar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
