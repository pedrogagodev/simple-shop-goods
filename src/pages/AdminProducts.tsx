
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductFormDialog from '@/components/admin/ProductFormDialog';
import DeleteProductDialog from '@/components/admin/DeleteProductDialog';
import Navbar from '@/components/Navbar';

// Mock data - você substituirá pela busca real dos produtos
const mockProducts = [
  {
    id: 1,
    name: "Camiseta Premium",
    description: "Camiseta de algodão premium com corte moderno",
    price: 89.90,
    image_url: "/placeholder.svg",
    stock: 15
  },
  {
    id: 2,
    name: "Calça Jeans Slim",
    description: "Calça jeans slim fit de alta qualidade",
    price: 159.90,
    image_url: "/placeholder.svg",
    stock: 8
  },
  {
    id: 3,
    name: "Tênis Esportivo",
    description: "Tênis confortável para atividades físicas",
    price: 299.90,
    image_url: "/placeholder.svg",
    stock: 0
  }
];

const AdminProducts = () => {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { toast } = useToast();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormDialogOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsFormDialogOpen(true);
  };

  const getStockBadge = (stock) => {
    if (stock === 0) {
      return <Badge variant="destructive">Esgotado</Badge>;
    } else if (stock <= 5) {
      return <Badge variant="outline" className="text-orange-600 border-orange-600">Baixo estoque</Badge>;
    } else {
      return <Badge variant="secondary">Em estoque</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-primary">Gerenciar Produtos</h1>
              <p className="text-gray-600">Adicione, edite ou remova produtos da sua loja</p>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleAddProduct} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Produto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Produtos ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto cadastrado'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? 'Tente buscar por outro termo' 
                    : 'Comece adicionando seu primeiro produto'
                  }
                </p>
                {!searchTerm && (
                  <Button onClick={handleAddProduct} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Adicionar Primeiro Produto
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Estoque</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                              {product.image_url ? (
                                <img 
                                  src={product.image_url} 
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="h-6 w-6 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">
                                {product.description}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            {product.price.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            })}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono">{product.stock} un.</span>
                        </TableCell>
                        <TableCell>
                          {getStockBadge(product.stock)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteProduct(product)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Dialogs */}
        <ProductFormDialog
          open={isFormDialogOpen}
          onOpenChange={setIsFormDialogOpen}
          product={selectedProduct}
          onSuccess={() => {
            setIsFormDialogOpen(false);
            toast({
              title: selectedProduct ? "Produto atualizado!" : "Produto criado!",
              description: selectedProduct 
                ? "As alterações foram salvas com sucesso." 
                : "O produto foi adicionado à loja.",
            });
          }}
        />

        <DeleteProductDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          product={selectedProduct}
          onSuccess={() => {
            setIsDeleteDialogOpen(false);
            toast({
              title: "Produto excluído!",
              description: "O produto foi removido da loja.",
            });
          }}
        />
      </div>
    </div>
  );
};

export default AdminProducts;
