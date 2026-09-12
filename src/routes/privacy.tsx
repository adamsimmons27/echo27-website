import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/echo/Navbar";
import { Footer } from "@/components/echo/Footer";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Echo 27" },
      { name: "description", content: "How Echo 27 collects, uses, and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-[800px] px-6 pt-32 pb-24">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-8 text-foreground/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-3">Overview</h2>
            <p>
              Echo 27 ("we", "us") respects your privacy. This policy explains
              what information we collect when you visit our website or get in
              touch with us, how we use it, and the choices you have.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Information we collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information you give us when you book a call or contact us (name, email, company, message).</li>
              <li>Basic analytics data such as pages viewed, device type, and referring source.</li>
              <li>Cookies used to remember preferences and measure site performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">How we use it</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to inquiries and deliver services you've requested.</li>
              <li>To improve the website and our marketing.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Sharing</h2>
            <p>
              We don't sell your personal information. We share it only with
              service providers we use to operate the business (e.g. email,
              analytics, scheduling), and only as needed to provide those
              services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Your choices</h2>
            <p>
              You can ask us to access, correct, or delete the personal
              information we hold about you, or opt out of marketing
              communications at any time. Contact us and we'll take care of it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p>
              Questions about this policy? Reach out via the{" "}
              <Link to="/" hash="contact" className="text-teal hover:underline">contact section</Link>{" "}
              on the homepage.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
