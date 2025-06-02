
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Package, AlertTriangle } from 'lucide-react';

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any;
  onSuccess: () => void;
}

const DeleteProductDialog = ({ open, onOpenChange, product, onSuccess }: DeleteProductDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!product) return;
    
    setLoading(true);
    try {
      // Aqui você implementará a lógica real de exclusão do produto
      console.log('Excluindo produto:', product.id);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-left">
                Excluir Produto
              </AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-left">
            Tem certeza que deseja excluir <strong>"{product.name}"</strong>?
            Esta ação não pode ser desfeita e o produto será removido permanentemente da sua loja.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Product Preview */}
        <div className="bg-gray-50 rounded-lg p-4 my-4">
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
            <div className="flex-1">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">
                {product.price?.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })} • {product.stock} em estoque
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? 'Excluindo...' : 'Excluir Produto'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
