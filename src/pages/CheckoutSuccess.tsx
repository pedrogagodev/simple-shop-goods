
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const CheckoutSuccess = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  
  // Redireciona para a página inicial se o usuário acessar diretamente sem um pedido
  useEffect(() => {
    if (items.length > 0) {
      navigate("/");
    }
  }, [items, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-primary mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-8">
            Seu pedido foi realizado com sucesso e será processado em breve. Enviamos um email de confirmação com os detalhes.
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button className="w-full flex items-center justify-center">
                Continuar Comprando <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <p className="text-sm text-gray-500">
              Caso tenha alguma dúvida, entre em contato com nosso suporte em<br />
              <a href="mailto:suporte@fashionstore.com" className="text-blue-600 hover:underline">
                suporte@fashionstore.com
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
