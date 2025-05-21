
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { CreditCard, Truck } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CheckoutFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    }
  });
  
  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulando o envio do pedido
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Limpa o carrinho após o envio
      clearCart();
      
      // Redireciona para a página de sucesso
      navigate("/checkout/success");
    } catch (error) {
      console.error("Error processing checkout:", error);
      toast.error("Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8 flex-1">
        <h1 className="text-3xl font-bold text-primary mb-6">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Customer Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <Truck className="mr-2 h-5 w-5" /> Informações de Entrega
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Seu nome completo" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="seu.email@exemplo.com" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(00) 00000-0000" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Rua, número, complemento" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Sua cidade" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="UF" 
                                maxLength={2} 
                                {...field} 
                                required 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="00000-000" 
                                {...field} 
                                required 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" /> Informações de Pagamento
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Nome no Cartão</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Nome como está no cartão" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Número do Cartão</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="0000 0000 0000 0000" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validade</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="MM/AA" 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardCvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123" 
                              maxLength={4} 
                              {...field} 
                              required 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold text-primary mb-4">Resumo do Pedido</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium">{item.product.name}</span>
                      <span className="text-gray-500"> ({item.size}) x{item.quantity}</span>
                    </div>
                    <span className="font-medium">
                      {(item.product.price * item.quantity).toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Order Totals */}
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {totalPrice.toLocaleString('pt-BR', { 
                      style: 'currency', 
                      currency: 'BRL' 
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-medium">Grátis</span>
                </div>
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>
                      {totalPrice.toLocaleString('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
