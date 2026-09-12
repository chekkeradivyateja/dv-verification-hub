"use client";

import { useRouter } from "next/navigation";
import { BUTTONDOWN_FORM_ACTION, BUTTONDOWN_USERNAME } from "@/lib/site";

export default function EmailSignupForm({ tag }: { tag?: string }) {
  const router = useRouter();

  function handleSubmit() {
    // Buttondown's standard embeddable-form recipe: the actual POST goes to a
    // named popup so it doesn't navigate this tab, while we optimistically
    // send the visitor straight to the PDF. They still get a double opt-in
    // confirmation email from Buttondown to land on the actual list.
    window.open(
      `https://buttondown.email/${BUTTONDOWN_USERNAME}`,
      "popupwindow",
      "width=600,height=700"
    );
    window.setTimeout(() => {
      router.push("/thank-you");
    }, 250);
    return true;
  }

  return (
    <form
      action={BUTTONDOWN_FORM_ACTION}
      method="post"
      target="popupwindow"
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full"
    >
      <label htmlFor="bd-email" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="bd-email"
        required
        placeholder="you@company.com"
        className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <input type="hidden" name="embed" value="1" />
      {tag && <input type="hidden" name="tag" value={tag} />}
      <button
        type="submit"
        className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent-strong transition-colors whitespace-nowrap"
      >
        Send me the cheat-sheet
      </button>
    </form>
  );
}
