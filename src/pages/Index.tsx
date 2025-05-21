
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  // Pegamos apenas 4 produtos para exibir na página inicial
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section com Video */}
      <section className="relative bg-primary h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden bg-black/50">
          {/* Aqui seria um vídeo, mas estamos usando um placeholder */}
          <div className="w-full h-full flex items-center justify-center">
            <Video className="w-24 h-24 text-primary-foreground/60" />
          </div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Nova Coleção 2025
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8">
            Descubra o que há de mais moderno e elegante para expressar seu estilo único.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Conhecer Coleção <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-primary">Produtos em Destaque</h2>
            <Link to="/products">
              <Button variant="outline">
                Ver Todos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Estilo sem Complicação</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Peças exclusivas, confortáveis e de alta qualidade para todos os momentos da sua vida.
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Explorar Produtos <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
