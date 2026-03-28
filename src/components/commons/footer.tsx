import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const shopLinks = ["Electronics", "Fashion", "Home & Garden", "Sports", "Deals"];
  const customerServiceLinks = [
    "Contact Us",
    "Help Center",
    "Track Your Order",
    "Returns & Exchanges",
    "Size Guide",
  ];
  const aboutLinks = ["About shopmart", "Careers", "Press", "Investor Relations", "Sustainability"];
  const policyLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Shipping Policy", "Refund Policy"];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-black text-sm font-bold text-white">
                S
              </div>
              <p className="text-2xl font-bold text-black">ShopMart</p>
            </div>
            <p className="max-w-xs text-base leading-7 text-gray-600">
              Your one-stop destination for the latest technology, fashion, and
              lifestyle products. Quality guaranteed with fast shipping and
              excellent customer service.
            </p>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                123 Shop Street, Otper City, DC 12345
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (+20) 0109333333
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@shopmart.com
              </p>
            </div>
          </div>

          <FooterLinks title="SHOP" links={shopLinks} />
          <FooterLinks title="CUSTOMER SERVICE" links={customerServiceLinks} />
          <FooterLinks title="ABOUT" links={aboutLinks} />
          <FooterLinks title="POLICIES" links={policyLinks} />
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-extrabold tracking-wide text-black">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-base text-gray-600 transition-colors hover:text-black"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}