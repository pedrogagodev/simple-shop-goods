
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Trash2 } from "lucide-react";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const isCartEmpty = items.length === 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8 flex-1">
        <h1 className="text-3xl font-bold text-primary mb-6">Meu Carrinho</h1>
        
        {isCartEmpty ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-medium text-gray-600 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-6">Adicione produtos ao seu carrinho para continuar com a compra.</p>
            <Link to="/products">
              <Button className="flex items-center gap-2">
                Explorar Produtos <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow divide-y">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="p-4 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                      {item.product.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="sm:ml-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h3 className="font-medium text-primary">{item.product.name}</h3>
                          <p className="text-gray-500 text-sm">
                            Tamanho: {item.size}
                          </p>
                          <p className="font-semibold mt-1">
                            {item.product.price.toLocaleString('pt-BR', { 
                              style: 'currency', 
                              currency: 'BRL' 
                            })}
                          </p>
                        </div>
                        
                        <div className="flex items-center">
                          {/* Quantity Control */}
                          <div className="flex items-center border rounded-md mr-4">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              className="px-2 py-1 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Remover produto"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="mt-2 text-right text-sm font-medium">
                        Subtotal: {(item.quantity * item.product.price).toLocaleString('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Clear Cart Button */}
              <div className="mt-4 text-right">
                <Button 
                  variant="ghost" 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Limpar Carrinho
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-primary mb-4">Resumo do Pedido</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{totalPrice.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                    })}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium">Grátis</span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{totalPrice.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate("/checkout")} 
                  className="w-full flex items-center justify-center"
                >
                  Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
