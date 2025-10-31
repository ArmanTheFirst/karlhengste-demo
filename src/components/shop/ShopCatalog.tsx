"use client";

import { useEffect, useState } from "react";

// Extend Window interface to include ShopifyBuy
declare global {
  interface Window {
    ShopifyBuy?: {
      buildClient: (options: {
        domain: string;
        storefrontAccessToken: string;
        apiVersion: string;
      }) => any;
      UI: {
        init: (client: any) => any;
      };
    };
  }
}

type ShopifyEmbedOptions = {
  storeUrl: string;
  apiKey: string;
  apiVersion?: string;
  collectionHandle?: string;
};

export function ShopCatalog({
  storeUrl,
  apiKey,
  apiVersion = "2024-01",
  collectionHandle,
}: ShopifyEmbedOptions) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Shopify Buy Button SDK
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
      setError(null);
    };
    
    script.onerror = () => {
      setError("Failed to load Shopify Buy Button SDK");
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.ShopifyBuy) return;

    // Storefront API token is required for Buy Button SDK
    if (!apiKey) {
      setError("Storefront API token is required. Please configure NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in your .env.local file.");
      return;
    }

    try {
      const client = window.ShopifyBuy!.buildClient({
        domain: storeUrl,
        storefrontAccessToken: apiKey,
        apiVersion: apiVersion,
      });

      const ui = window.ShopifyBuy!.UI.init(client);

      // Create product collection
      if (collectionHandle) {
        ui.createComponent("collection", {
          id: collectionHandle,
          node: document.getElementById("shopify-collection"),
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(33.33333% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "20px",
                  },
                },
              },
              text: {
                button: "In den Warenkorb",
              },
              buttonDestination: "checkout",
            },
            cart: {
              text: {
                total: "Gesamt",
                button: "Zur Kasse",
              },
            },
            toggle: {
              cart: {
                styles: {
                  toggle: {
                    "background-color": "#00863A",
                  },
                },
              },
            },
          },
        });
      } else {
        // Show all products
        ui.createComponent("productSet", {
          node: document.getElementById("shopify-collection"),
          options: {
            product: {
              styles: {
                product: {
                  "@media (min-width: 601px)": {
                    "max-width": "calc(33.33333% - 20px)",
                    "margin-left": "20px",
                    "margin-bottom": "20px",
                  },
                },
              },
              text: {
                button: "In den Warenkorb",
              },
              buttonDestination: "checkout",
            },
            cart: {
              text: {
                total: "Gesamt",
                button: "Zur Kasse",
              },
            },
            toggle: {
              cart: {
                styles: {
                  toggle: {
                    "background-color": "#00863A",
                  },
                },
              },
            },
          },
        });
      }
    } catch (err: any) {
      setError(`Failed to initialize Shopify: ${err.message}`);
    }
  }, [isLoaded, storeUrl, apiKey, apiVersion, collectionHandle]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Fehler beim Laden des Shops: {error}</p>
          <p className="text-sm text-red-600 mt-2">
            Bitte überprüfen Sie die Shopify-Konfiguration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
            Produktkatalog
          </h1>
          <p className="text-gray-600 text-lg">
            Durchsuchen Sie unser Sortiment an hochwertigen Blechprodukten
          </p>
        </div>

        {/* Loading state */}
        {!isLoaded && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#00863A]"></div>
            <p className="mt-4 text-gray-600">Lade Produkte...</p>
          </div>
        )}

        {/* Shopify Collection Container */}
        <div
          id="shopify-collection"
          className="shopify-catalog"
          style={{
            display: isLoaded ? "block" : "none",
          }}
        />
      </div>

      {/* Custom styles for Shopify embed */}
      <style jsx global>{`
        .shopify-catalog {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-top: 24px;
        }

        .shopify-catalog .shopify-buy__product {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.3s ease;
          background: white;
        }

        .shopify-catalog .shopify-buy__product:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        .shopify-catalog .shopify-buy__product-title {
          font-weight: 600;
          color: #111827;
          font-size: 1.125rem;
          margin-bottom: 0.5rem;
        }

        .shopify-catalog .shopify-buy__product-price {
          font-weight: 600;
          color: #00863A;
          font-size: 1.25rem;
          margin: 0.5rem 0;
        }

        .shopify-catalog .shopify-buy__btn {
          background-color: #00863A !important;
          border-color: #00863A !important;
          color: white !important;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }

        .shopify-catalog .shopify-buy__btn:hover {
          background-color: #007030 !important;
          border-color: #007030 !important;
        }

        .shopify-catalog .shopify-buy__product__img-wrapper {
          overflow: hidden;
        }

        .shopify-catalog .shopify-buy__product__img {
          transition: transform 0.3s ease;
        }

        .shopify-catalog .shopify-buy__product:hover .shopify-buy__product__img {
          transform: scale(1.05);
        }

        /* Cart toggle button */
        .shopify-buy__cart-toggle {
          background-color: #00863A !important;
          border-color: #00863A !important;
        }

        .shopify-buy__cart-toggle:hover {
          background-color: #007030 !important;
        }
      `}</style>
    </section>
  );
}

