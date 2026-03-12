import { useState } from "react";
import productOrange from "@/assets/product-orange.png";
import productBlack from "@/assets/product-black.png";
import productLifestyle from "@/assets/product-lifestyle.png";
import { ShoppingCart, Star, Lock, Truck, RotateCcw, Shield, Zap, Snowflake, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} className={i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground/30"} />
    ))}
  </div>
);

const colorImages: Record<"orange" | "black", string[]> = {
  orange: [productOrange, productLifestyle],
  black: [productBlack, productLifestyle],
};

const Index = () => {
  const [selectedColor, setSelectedColor] = useState<"orange" | "black">("orange");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (color: "orange" | "black") => {
    setSelectedColor(color);
    setSelectedImageIndex(0);
  };

  const currentImages = colorImages[selectedColor];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#product" className="transition-colors hover:text-foreground">Shop</a>
            <a href="#reviews" className="transition-colors hover:text-foreground">Reviews</a>
            <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
          </div>
          <button className="relative">
            <ShoppingCart size={22} className="text-foreground" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
          </button>
        </div>
      </nav>

      {/* Hero / Product Section */}
      <section id="product" className="mx-auto max-w-6xl px-6 py-12 md:py-20">
        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-3">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-secondary via-muted to-secondary relative">
              <img
                src={currentImages[selectedImageIndex]}
                alt={`Frostbit Ice Screw — ${selectedColor}`}
                className="h-full w-full object-cover transition-all duration-300"
              />
              {/* Color badge overlay */}
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary/90 text-primary-foreground capitalize backdrop-blur-sm">
                  {selectedColor}
                </Badge>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-3">
              {currentImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImageIndex === i ? "border-primary scale-105 shadow-md" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
                The Original Ice Screw™
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={4.9} />
              <span className="text-sm font-medium text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-foreground">$34.99</span>
              <span className="text-lg text-muted-foreground line-through">$59.99</span>
              <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">SAVE 42%</Badge>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              The ultimate ice anchor. Precision-engineered stainless steel with a one-twist install that holds 500+ lbs. Whether you're ice fishing, camping, or anchoring a shelter — this is the only screw you need.
            </p>

            {/* Color Selector */}
            <div>
              <p className="mb-3 text-sm font-semibold text-foreground">
                Color: <span className="font-normal text-muted-foreground capitalize">{selectedColor}</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleColorChange("orange")}
                  title="Orange"
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    selectedColor === "orange" ? "border-foreground scale-110 shadow-lg" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: "hsl(24, 95%, 53%)" }}
                />
                <button
                  onClick={() => handleColorChange("black")}
                  title="Black"
                  className={`h-10 w-10 rounded-full border-2 transition-all ${
                    selectedColor === "black" ? "border-foreground scale-110 shadow-lg" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: "hsl(0, 0%, 12%)" }}
                />
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ChevronDown size={18} />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground">
                  <ChevronUp size={18} />
                </button>
              </div>
              <Button className="flex-1 rounded-lg py-6 text-base font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30">
                Add to Cart — ${(34.99 * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Lock size={14} /> Secure Checkout</span>
              <span className="flex items-center gap-1.5"><Truck size={14} /> Free US Shipping</span>
              <span className="flex items-center gap-1.5"><RotateCcw size={14} /> 30-Day Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y bg-secondary/50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            { icon: Shield, title: "Solid Stainless Steel", desc: "Marine-grade 304 steel, rust-proof" },
            { icon: Zap, title: "Holds 500+ lbs", desc: "Lab-tested tensile strength" },
            { icon: Snowflake, title: "One-Twist Install", desc: "Locks in under 3 seconds" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 px-6 py-8 md:justify-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="bg-foreground py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 text-center">
          <span className="text-lg">🔥</span>
          <p className="text-sm font-semibold text-background">
            Trending on TikTok — <span className="text-primary">12M+ Views</span> · As seen on Instagram & YouTube
          </p>
          <span className="text-lg">🔥</span>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Customer Reviews</p>
          <h2 className="text-2xl font-extrabold text-foreground md:text-3xl">Loved by 2,847+ Customers</h2>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
          {[
            {
              name: "Jake M.",
              location: "Minnesota, US",
              rating: 5,
              text: "Saw this on TikTok and had to get one. Honestly? It's even better in person. Screwed into 8 inches of ice in literally 2 seconds. My buddies all want one now.",
              date: "2 weeks ago",
            },
            {
              name: "Sarah L.",
              location: "Alberta, Canada",
              rating: 5,
              text: "I've been ice fishing for 15 years and this is hands-down the best ice anchor I've ever used. The build quality is insane for the price. Already ordered two more as gifts.",
              date: "1 month ago",
            },
          ].map((review) => (
            <div key={review.name} className="rounded-2xl border p-6">
              <div className="mb-3 flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-foreground">"{review.text}"</p>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {review.name[0]}
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    {review.name}
                    <CheckCircle size={14} className="text-primary" />
                  </p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping Banner */}
      <section className="border-y bg-secondary/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-6 py-8 text-center md:flex-row md:gap-12">
          <p className="text-sm text-foreground">
            🇺🇸 <span className="font-semibold">US Shipping:</span> <span className="text-muted-foreground">Free — 3-5 business days</span>
          </p>
          <div className="hidden h-4 w-px bg-border md:block" />
          <p className="text-sm text-foreground">
            🇬🇧 <span className="font-semibold">UK Shipping:</span> <span className="text-muted-foreground">$4.99 — 5-8 business days</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
