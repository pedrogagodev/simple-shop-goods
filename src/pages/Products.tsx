
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  // Load filters from URL params on initial render
  useEffect(() => {
    const category = searchParams.get("category") || "todos";
    const minPrice = Number(searchParams.get("minPrice")) || 0;
    const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
    const search = searchParams.get("search") || "";

    setSelectedCategory(category);
    setPriceRange({ min: minPrice, max: maxPrice });
    setSearchTerm(search);
  }, [searchParams]);

  // Apply filters whenever filter state changes
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "todos") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(filtered);

    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory !== "todos") params.set("category", selectedCategory);
    if (priceRange.min > 0) params.set("minPrice", priceRange.min.toString());
    if (priceRange.max < 1000) params.set("maxPrice", priceRange.max.toString());
    if (searchTerm) params.set("search", searchTerm);
    
    setSearchParams(params);
  }, [selectedCategory, priceRange, searchTerm, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect
  };

  const clearFilters = () => {
    setSelectedCategory("todos");
    setPriceRange({ min: 0, max: 1000 });
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Mobile Filters Toggle */}
          <div className="w-full md:hidden mb-4">
            <Button 
              onClick={() => setShowFilters(!showFilters)} 
              variant="outline"
              className="w-full flex items-center justify-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Ocultar Filtros" : "Exibir Filtros"}
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`w-full md:w-64 bg-secondary/20 rounded-lg p-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <h2 className="text-xl font-bold mb-4 text-primary">Filtros</h2>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
              </div>
            </form>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-primary">Categorias</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <div key={category.value} className="flex items-center">
                    <input
                      type="radio"
                      id={category.value}
                      name="category"
                      checked={selectedCategory === category.value}
                      onChange={() => setSelectedCategory(category.value)}
                      className="mr-2"
                    />
                    <Label htmlFor={category.value} className="cursor-pointer">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2 text-primary">Faixa de Preço</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <Label htmlFor="minPrice" className="text-sm">Mínimo</Label>
                  <Input
                    type="number"
                    id="minPrice"
                    min="0"
                    max={priceRange.max}
                    value={priceRange.min}
                    onChange={(e) => 
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice" className="text-sm">Máximo</Label>
                  <Input
                    type="number"
                    id="maxPrice"
                    min={priceRange.min}
                    value={priceRange.max}
                    onChange={(e) => 
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Limpar Filtros
            </Button>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-primary">Produtos</h1>
              {filteredProducts.length === 0 ? (
                <p className="text-gray-500">Nenhum produto encontrado.</p>
              ) : (
                <p className="text-gray-500">{filteredProducts.length} produtos encontrados</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
