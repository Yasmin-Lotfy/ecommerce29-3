import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-6 py-14 text-center">
      <section className="w-full">
        <h1 className="text-3xl font-extrabold tracking-tight text-black md:text-3xl">
          Welcome to ShopMart
        </h1>
        <p className="mx-auto mt-7 max-w-4xl text-2xl leading-relaxed text-slate-600">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="inline-flex h-16 min-w-56 items-center justify-center rounded-2xl border-2 border-black bg-black px-10 text-xl font-bold text-white transition-colors hover:bg-white hover:text-black"
          >
            Shop Now
          </Link>
          <Link
            href="/categories"
            className="inline-flex h-16 min-w-72 items-center justify-center rounded-2xl border-2 border-black bg-white px-10 text-xl font-bold text-black transition-colors hover:bg-black hover:text-white"
          >
            Browse Categories
          </Link>
        </div>
      </section>
    </main>
  );
}
