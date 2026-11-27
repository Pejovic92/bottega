import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { contact } from "../../data/contact";
import { emptyAnswers, validateContact } from "./quoteOptions";
import sendQuote from "./sendQuote";
import { ProductStep, SpaceStep, LookStep, DetailsStep, ContactStep } from "./QuoteSteps";

const steps = [
  { title: "Šta vam treba?", intro: "Izaberite jedan ili više proizvoda.", Body: ProductStep },
  {
    title: "Prostor i mere",
    intro: "Upišite okvirne mere u centimetrima. Ako ih ne znate, doći ćemo da izmerimo.",
    Body: SpaceStep,
  },
  {
    title: "Materijal i izgled",
    intro: "Izaberite šta vam se dopada. Konačan izbor pravimo zajedno.",
    Body: LookStep,
  },
  { title: "Okov i detalji", intro: "Označite sve što vam je važno.", Body: DetailsStep },
  {
    title: "Vaši podaci",
    intro: "Javićemo vam se sa ponudom ili da dogovorimo merenje.",
    Body: ContactStep,
  },
];

// Where each required field is, in the order the form checks them, so the first wrong one gets
// the focus.
const errorFields = [
  ["name", "quote-name"],
  ["reach", "quote-phone"],
  ["email", "quote-email"],
  ["consent", "quote-consent"],
];

// The quote questionnaire, in a native <dialog> (it keeps the focus inside, Esc closes it and the
// page behind can't be used). Desktop: a centred panel over a dimmed page; phones: full screen.
// Five steps with "Korak n od 5" and a progress bar; only the last one has required fields. The
// panel keeps one height on every step (so the buttons don't jump), and the header with the
// progress and the footer with the buttons stay put while the step scrolls between them.
// Closing keeps the answers, so reopening continues where the person left off; after sending,
// closing starts afresh.
// Sending: "Pošalji upit" sends the answers in the background (sendQuote, through Web3Forms) and
// the visitor stays on the page: the button reads "Šaljemo…" until the answer comes, then the
// panel shows a thank-you, centred under a check mark. If sending fails, a red line above the
// buttons says so and offers the email address; the answers stay, so trying again is one click.
const QuoteDialog = ({ open, onClose }) => {
  const dialogRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [showErrors, setShowErrors] = useState(false);
  // "idle", "sending", "sent" or "failed".
  const [status, setStatus] = useState("idle");
  const sent = status === "sent";
  const errors = showErrors ? validateContact(answers) : {};
  const last = steps.length - 1;
  const { title, intro, Body } = steps[step];

  const update = (patch) => setAnswers((current) => ({ ...current, ...patch }));

  // Follow the `open` prop with the native dialog.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The dialog closes itself on Esc too; tell the parent, and start afresh after a sent request.
  useEffect(() => {
    const dialog = dialogRef.current;
    const handleClose = () => {
      onClose();
      if (sent) {
        setAnswers(emptyAnswers);
        setStep(0);
        setShowErrors(false);
        setStatus("idle");
      }
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose, sent]);

  // Keep the page behind from scrolling while the dialog is open.
  useEffect(() => {
    if (!open) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  // On a new step (or the thank-you screen), start at its top and move the focus to its heading,
  // so screen readers announce it.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    bodyRef.current?.scrollTo(0, 0);
    headingRef.current?.focus();
  }, [step, sent]);

  const send = async () => {
    const found = validateContact(answers);
    if (Object.keys(found).length) {
      setShowErrors(true);
      const firstWrong = errorFields.find(([key]) => found[key]);
      document.getElementById(firstWrong[1])?.focus();
      return;
    }
    setStatus("sending");
    try {
      await sendQuote(answers);
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // The button isn't disabled while sending (a disabled button would drop the focus), so a
    // second click is ignored here instead.
    if (status === "sending") return;
    if (step < last) setStep(step + 1);
    else send();
  };

  const close = () => dialogRef.current.close();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="quote-title"
      // A click on the dimmed backdrop (it counts as the dialog itself) closes the dialog.
      onClick={(event) => event.target === dialogRef.current && close()}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-md bg-[#F9F7F2] p-0 text-[#26272E] shadow-2xl backdrop:bg-[#26272E]/60 open:motion-safe:animate-[fade-up_0.3s_ease-out] max-sm:h-dvh max-sm:max-h-none max-sm:w-full max-sm:max-w-none max-sm:rounded-none"
    >
      <form noValidate onSubmit={handleSubmit} className="flex h-[min(88dvh,780px)] flex-col max-sm:h-full">
        <header className="flex items-start justify-between gap-4 border-b border-[#BDC1AF] px-5 py-4 sm:px-8 sm:py-5">
          <div>
            <h2 id="quote-title" className="font-fraunces text-[22px] leading-tight sm:text-[24px]">
              Upit za ponudu
            </h2>
            {!sent && (
              <>
                <p className="mt-1 font-ledger text-[13px] uppercase tracking-[0.15em] text-[#5E3D25]">
                  Korak {step + 1} od {steps.length}
                </p>
                <div aria-hidden="true" className="mt-3 flex gap-1.5">
                  {steps.map((item, index) => (
                    <span
                      key={item.title}
                      className={`h-1 w-8 rounded-full transition-colors sm:w-10 ${index <= step ? "bg-[#5E3D25]" : "bg-[#BDC1AF]"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Zatvori"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#26272E] transition-colors hover:bg-[#26272E]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E3D25]"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-6 w-6">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div
          ref={bodyRef}
          className={`flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-7 ${sent ? "flex flex-col items-center justify-center text-center" : ""}`}
        >
          {sent ? (
            <>
              <span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5E3D25] text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <h3 ref={headingRef} tabIndex={-1} className="mt-5 font-fraunces text-[24px] leading-tight outline-none sm:text-[28px]">
                Hvala, upit je poslat!
              </h3>
              <p className="mt-2 max-w-md font-ledger text-[15px] text-[#26272E]/80">
                Pregledaćemo vaše odgovore i javiti vam se sa ponudom ili da dogovorimo merenje.
              </p>
              <p className="mt-3 max-w-md font-ledger text-[15px] text-[#26272E]/80">
                Ako u međuvremenu imate pitanje, pozovite nas na{" "}
                <a href={contact.phone.href} className="whitespace-nowrap text-[#5E3D25] underline underline-offset-4">
                  {contact.phone.label}
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <h3 ref={headingRef} tabIndex={-1} className="font-fraunces text-[24px] leading-tight outline-none sm:text-[28px]">
                {title}
              </h3>
              <p className="mt-2 font-ledger text-[15px] text-[#26272E]/80">{intro}</p>
              <div className="mt-6">
                <Body answers={answers} update={update} errors={errors} />
              </div>
            </>
          )}
        </div>

        <footer className="border-t border-[#BDC1AF] px-5 py-4 sm:px-8">
          {/* Always in the page, so screen readers announce the failure when its text appears. */}
          <div aria-live="polite">
            {status === "failed" && step === last && (
              <p className="mb-3 font-ledger text-[14px] text-[#9B2C1F]">
                Upit nije poslat. Proverite internet vezu i pokušajte ponovo, ili nam pišite na{" "}
                <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
                  {contact.email}
                </a>
                .
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            {sent ? (
              <button
                type="button"
                onClick={close}
                className="ml-auto inline-flex h-12 items-center rounded-full bg-[#5E3D25] px-8 font-ledger text-[15px] font-bold text-white transition-colors hover:bg-[#4A2F1C]"
              >
                Zatvori
              </button>
            ) : (
              <>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="font-ledger text-[15px] text-[#5E3D25] underline-offset-4 hover:underline"
                  >
                    ← Nazad
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  aria-disabled={status === "sending"}
                  className="inline-flex h-12 items-center rounded-full bg-[#5E3D25] px-8 font-ledger text-[15px] font-bold text-white transition-colors hover:bg-[#4A2F1C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5E3D25] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F2] aria-disabled:cursor-wait"
                >
                  {step < last ? "Dalje →" : status === "sending" ? "Šaljemo…" : "Pošalji upit"}
                </button>
              </>
            )}
          </div>
        </footer>
      </form>
    </dialog>
  );
};

QuoteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default QuoteDialog;
