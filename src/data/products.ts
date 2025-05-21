
import { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica",
    price: 49.90,
    description: "Camiseta básica de algodão com corte regular. Ideal para o dia a dia com conforto e estilo.",
    category: "camisetas",
    image: "/placeholder.svg",
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: 2,
    name: "Calça Jeans Slim",
    price: 129.90,
    description: "Calça jeans com corte slim e lavagem média. Confortável e versátil para diversas ocasiões.",
    category: "calcas",
    image: "/placeholder.svg",
    sizes: ["38", "40", "42", "44", "46"]
  },
  {
    id: 3,
    name: "Vestido Midi",
    price: 159.90,
    description: "Vestido midi em tecido leve com estampa exclusiva. Perfeito para ocasiões especiais.",
    category: "vestidos",
    image: "/placeholder.svg",
    sizes: ["P", "M", "G"]
  },
  {
    id: 4,
    name: "Camisa Social",
    price: 89.90,
    description: "Camisa social de algodão com acabamento premium. Ideal para ocasiões formais.",
    category: "camisas",
    image: "/placeholder.svg",
    sizes: ["P", "M", "G", "GG"]
  },
  {
    id: 5,
    name: "Jaqueta Jeans",
    price: 199.90,
    description: "Jaqueta jeans com lavagem clara e bolsos frontais. Peça atemporal para seu guarda-roupa.",
    category: "jaquetas",
    image: "/placeholder.svg",
    sizes: ["P", "M", "G"]
  },
  {
    id: 6,
    name: "Blusa de Tricô",
    price: 89.90,
    description: "Blusa de tricô com detalhes em relevo. Perfeita para os dias mais frios com estilo.",
    category: "blusas",
    image: "/placeholder.svg",
    sizes: ["P", "M", "G"]
  },
  {
    id: 7,
    name: "Shorts Jeans",
    price: 79.90,
    description: "Shorts jeans com barra desfiada. Ideal para looks descontraídos de verão.",
    category: "shorts",
    image: "/placeholder.svg",
    sizes: ["38", "40", "42", "44"]
  },
  {
    id: 8,
    name: "Blazer Slim",
    price: 249.90,
    description: "Blazer com corte slim em tecido texturizado. Elegante e moderno para diversas ocasiões.",
    category: "blazers",
    image: "/placeholder.svg",
    sizes: ["P", "M", "G", "GG"]
  }
];

export const categories = [
  { value: "todos", label: "Todos os Produtos" },
  { value: "camisetas", label: "Camisetas" },
  { value: "calcas", label: "Calças" },
  { value: "vestidos", label: "Vestidos" },
  { value: "camisas", label: "Camisas" },
  { value: "jaquetas", label: "Jaquetas" },
  { value: "blusas", label: "Blusas" },
  { value: "shorts", label: "Shorts" },
  { value: "blazers", label: "Blazers" }
];
