import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const h = () => setTick((s) => s + 1);
    window.addEventListener("langchange", h);
    return () => window.removeEventListener("langchange", h);
  }, []);
  type Win = Window & { __i18n?: { t: (k: string) => string } };
  const w = window as Win;
  const t = (k: string) => w.__i18n?.t(k) ?? k;

  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee - discount;

  const applyPromoCode = () => {
    const validCodes = {
      'FRESH10': 0.1,
      'ORGANIC15': 0.15,
      'HARVEST20': 0.2
    };
    
    const promoUpper = promoCode.toUpperCase();
    if (validCodes[promoUpper as keyof typeof validCodes]) {
      setDiscount(subtotal * validCodes[promoUpper as keyof typeof validCodes]);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">
            {t("cart_empty_title")}
          </h2>
          <p className="text-muted-foreground mb-8">{t("cart_empty_sub")}</p>
          <Link to="/products">
            <Button size="lg">{t("browse_products")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-4xl font-bold mb-8">
          {t("shopping_cart")}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{t(item.name)}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t(item.farmName)}
                    </p>
                    <p className="text-sm font-medium">
                      ₹{item.price}/{item.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-4">
              <h2 className="font-semibold text-lg mb-4">{t("order_summary")}</h2>
              
              {/* Promo Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={t("promo_code")}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={applyPromoCode}>
                    {t("apply")}
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t("subtotal")}</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("delivery_fee")}</span>
                  <span>{deliveryFee === 0 ? t("free") : `₹${deliveryFee}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{t("discount")}</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>{t("total")}</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                {t("proceed_to_checkout")}
              </Button>

              <p className="text-sm text-muted-foreground mt-4 text-center">
                {subtotal < 500 && t("free_delivery_hint")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
