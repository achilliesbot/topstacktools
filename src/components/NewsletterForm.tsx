"use client";

export default function NewsletterForm() {
  return (
    <form
      className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="you@company.com"
        className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white placeholder:text-white/30 focus:ring-2 focus:ring-evergreen focus:border-evergreen focus:outline-none transition-all"
      />
      <button
        type="submit"
        className="btn-pill bg-evergreen text-white !py-3.5"
      >
        Subscribe
      </button>
    </form>
  );
}
