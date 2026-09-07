import type { Producto } from "../types";
import { formatearPrecio } from "../types";

interface SchemaMarkupProps {
  productos: Producto[];
}

export default function SchemaMarkup({ productos }: SchemaMarkupProps) {
  const baseUrl = "https://epikas.vercel.app";

  const storeSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Epikas · Bisutería Católica",
    description:
      "Bisutería católica artesanal: rosarios, medallas, collares, anillos y pulseras hechos con fe.",
    url: baseUrl,
    priceRange: "$$",
    acceptsPayment: {
      "@type": "PaymentMethod",
      name: "Cash",
    },
    areaServed: {
      "@type": "Country",
      name: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+52-1-55-4890-1234",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
    },
  };

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de Bisutería Católica",
    description: "Colección completa de rosarios, medallas, collares, anillos y pulseras artesanales",
    numberOfItems: productos.length,
    itemListElement: productos.slice(0, 20).map((producto, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}#${producto.id}`,
      name: producto.nombre,
      image: producto.imagen,
    })),
  };

  const productSchemas = productos.map((producto) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: producto.nombre,
    description: producto.descripcion,
    image: producto.imagen,
    offers: {
      "@type": "Offer",
      price: producto.precio,
      priceCurrency: "VES",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Store",
        name: "Epikas · Bisutería Católica",
      },
    },
    category: producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1),
    material: producto.material,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />
      {productSchemas.map((schema, index) => (
        <script
          key={productos[index].id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
