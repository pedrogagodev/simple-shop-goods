
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Fashion Store</h3>
            <p className="text-sm opacity-80">
              Roupas de qualidade com estilo para todos os momentos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/products" className="hover:underline">Produtos</Link></li>
              <li><Link to="/cart" className="hover:underline">Carrinho</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contato@fashionstore.com</li>
              <li>Telefone: (11) 99999-9999</li>
              <li>Endereço: Av. Paulista, 1000 - São Paulo/SP</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/30 mt-8 pt-6 text-sm text-center opacity-70">
          <p>&copy; {new Date().getFullYear()} Fashion Store. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
