
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, image } = product;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link to={`/products/${id}`}>
        <div className="aspect-square relative overflow-hidden bg-secondary/20">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
              <Package className="h-16 w-16 text-primary/40" />
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <h3 className="font-medium text-primary mb-1 truncate">{name}</h3>
        <p className="text-lg font-semibold">
          {price.toLocaleString('pt-BR', { 
            style: 'currency', 
            currency: 'BRL' 
          })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link to={`/products/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Ver detalhes
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
