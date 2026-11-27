import PropTypes from "prop-types";
import { products } from "../../data/products";
import { locations } from "../../data/contact";
import { decors, fronts, details, contactMethods, timeframes, OTHER_PLACE } from "./quoteOptions";

// The five steps of the quote form, and the small form pieces they are built from. Choices are
// real checkboxes and radios, visually hidden inside a styled label, so keyboards and screen
// readers use them as usual; the label shows the chosen state (brown) and the keyboard focus.

const toggle = (list, value) => (list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);

const focusRing =
  "peer-focus-visible:ring-2 peer-focus-visible:ring-[#5E3D25] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#F9F7F2]";

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 shrink-0"
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

// A checkbox or radio as a pill.
const Chip = ({ type, name, label, checked, onChange }) => (
  <label className="cursor-pointer">
    <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
    <span
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 font-ledger text-[15px] transition-colors ${focusRing} ${checked ? "border-[#5E3D25] bg-[#5E3D25] text-white" : "border-[#BDC1AF] bg-white hover:border-[#5E3D25]"}`}
    >
      {checked && <CheckIcon />}
      {label}
    </span>
  </label>
);

Chip.propTypes = {
  type: PropTypes.oneOf(["checkbox", "radio"]).isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Hint = ({ children }) => <span className="font-normal text-[#26272E]/70"> ({children})</span>;

Hint.propTypes = { children: PropTypes.node.isRequired };

const ChipGroup = ({ legend, hint, type, name, options, isChecked, onPick }) => (
  <fieldset>
    <legend className="font-ledger text-[15px] font-bold">
      {legend}
      {hint && <Hint>{hint}</Hint>}
    </legend>
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option}
          type={type}
          name={name}
          label={option}
          checked={isChecked(option)}
          onChange={() => onPick(option)}
        />
      ))}
    </div>
  </fieldset>
);

ChipGroup.propTypes = {
  legend: PropTypes.string.isRequired,
  hint: PropTypes.string,
  type: PropTypes.oneOf(["checkbox", "radio"]).isRequired,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  isChecked: PropTypes.func.isRequired,
  onPick: PropTypes.func.isRequired,
};

// A labelled text input or textarea. `error` shows a message under it; `invalid` and `describedBy`
// mark it as wrong when the message sits under another field (phone or email).
const TextField = ({ id, label, hint, value, onChange, error, invalid, describedBy, multiline, ...rest }) => {
  const isInvalid = Boolean(error) || invalid;
  const describedByIds = [error && `${id}-error`, describedBy].filter(Boolean).join(" ") || undefined;
  const props = {
    id,
    value,
    onChange: (event) => onChange(event.target.value),
    "aria-invalid": isInvalid || undefined,
    "aria-describedby": describedByIds,
    className: `mt-2 w-full rounded-md border bg-white px-3 py-2.5 font-ledger text-[15px] outline-none transition-colors placeholder:text-[#26272E]/65 focus-visible:ring-2 focus-visible:ring-[#5E3D25]/40 ${isInvalid ? "border-[#9B2C1F]" : "border-[#BDC1AF] focus:border-[#5E3D25]"}`,
    ...rest,
  };

  return (
    <div>
      <label htmlFor={id} className="font-ledger text-[15px] font-bold">
        {label}
        {hint && <Hint>{hint}</Hint>}
      </label>
      {multiline ? <textarea rows={3} {...props} /> : <input type="text" {...props} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-ledger text-[14px] text-[#9B2C1F]">
          {error}
        </p>
      )}
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  invalid: PropTypes.bool,
  describedBy: PropTypes.string,
  multiline: PropTypes.bool,
};

const stepProps = {
  answers: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

// 1. Products: the cards from the products section, small, more than one allowed.
export const ProductStep = ({ answers, update }) => (
  <fieldset>
    <legend className="sr-only">Proizvodi</legend>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {products.map(({ title, image }) => {
        const checked = answers.products.includes(title);
        return (
          <label key={title} className="cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => update({ products: toggle(answers.products, title) })}
              className="peer sr-only"
            />
            <span
              className={`block overflow-hidden rounded-md border-2 bg-white transition-colors ${focusRing} ${checked ? "border-[#5E3D25]" : "border-transparent hover:border-[#BDC1AF]"}`}
            >
              <img src={image.thumb} alt="" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
              <span
                className={`flex min-h-[44px] items-center justify-between gap-2 px-3 py-2 font-ledger text-[14px] leading-snug sm:text-[15px] ${checked ? "bg-[#5E3D25] text-white" : ""}`}
              >
                {title}
                {checked && <CheckIcon />}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

ProductStep.propTypes = stepProps;

// 2. The space: rough sizes, or a visit to measure, and a free description.
export const SpaceStep = ({ answers, update }) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-3 gap-3">
      <TextField id="quote-width" label="Širina (cm)" inputMode="numeric" value={answers.width} onChange={(width) => update({ width })} />
      <TextField id="quote-height" label="Visina (cm)" inputMode="numeric" value={answers.height} onChange={(height) => update({ height })} />
      <TextField id="quote-depth" label="Dubina (cm)" inputMode="numeric" value={answers.depth} onChange={(depth) => update({ depth })} />
    </div>
    <div>
      <Chip
        type="checkbox"
        label="Ne znam tačne mere, dođite da izmerite"
        checked={answers.measureVisit}
        onChange={() => update({ measureVisit: !answers.measureVisit })}
      />
    </div>
    <TextField
      id="quote-space"
      label="Opišite prostor"
      hint="opciono"
      multiline
      placeholder="Na primer: niša u hodniku, kosi plafon, radijator ispod prozora…"
      value={answers.space}
      onChange={(space) => update({ space })}
    />
  </div>
);

SpaceStep.propTypes = stepProps;

// 3. The look: decor swatches (more than one allowed, or ask for advice) and the kind of fronts.
export const LookStep = ({ answers, update }) => (
  <div className="flex flex-col gap-8">
    <fieldset>
      <legend className="font-ledger text-[15px] font-bold">
        Dekori koji vam se dopadaju
        <Hint>može više</Hint>
      </legend>
      <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {decors.map(({ id, label, swatch }) => {
          const checked = answers.decors.includes(id);
          return (
            <label key={id} className="cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => update({ decors: toggle(answers.decors, id) })}
                className="peer sr-only"
              />
              <span
                className={`block rounded-md border-2 bg-white p-1.5 transition-colors ${focusRing} ${checked ? "border-[#5E3D25]" : "border-transparent hover:border-[#BDC1AF]"}`}
              >
                <span className="relative block aspect-square rounded ring-1 ring-inset ring-black/10" style={{ background: swatch }}>
                  {checked && (
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-[#5E3D25] p-1 text-white">
                      <CheckIcon />
                    </span>
                  )}
                </span>
                <span className="mt-1.5 block text-center font-ledger text-[14px] leading-snug">{label}</span>
              </span>
            </label>
          );
        })}
      </div>
      <div className="mt-3">
        <Chip
          type="checkbox"
          label="Ne znam, posavetujte me"
          checked={answers.decorAdvice}
          onChange={() => update({ decorAdvice: !answers.decorAdvice })}
        />
      </div>
    </fieldset>
    <ChipGroup
      legend="Frontovi (vrata i fioke)"
      type="radio"
      name="quote-front"
      options={fronts}
      isChecked={(option) => answers.front === option}
      onPick={(front) => update({ front })}
    />
  </div>
);

LookStep.propTypes = stepProps;

// 4. Hardware and extras, in plain words, plus anything else worth knowing.
export const DetailsStep = ({ answers, update }) => (
  <div className="flex flex-col gap-8">
    <ChipGroup
      legend="Šta želite"
      hint="može više"
      type="checkbox"
      options={details}
      isChecked={(option) => answers.details.includes(option)}
      onPick={(option) => update({ details: toggle(answers.details, option) })}
    />
    <TextField
      id="quote-note"
      label="Još nešto što bi trebalo da znamo?"
      hint="opciono"
      multiline
      value={answers.note}
      onChange={(note) => update({ note })}
    />
  </div>
);

DetailsStep.propTypes = stepProps;

// 5. Contact: the only step with required fields (name, phone or email, consent).
export const ContactStep = ({ answers, update, errors = {} }) => (
  <div className="flex flex-col gap-6">
    <TextField
      id="quote-name"
      label="Ime i prezime"
      autoComplete="name"
      value={answers.name}
      onChange={(name) => update({ name })}
      error={errors.name}
    />
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="quote-phone"
          label="Telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={answers.phone}
          onChange={(phone) => update({ phone })}
          invalid={Boolean(errors.reach)}
          describedBy={errors.reach ? "quote-reach-error" : "quote-reach-hint"}
        />
        <TextField
          id="quote-email"
          label="Email"
          type="email"
          autoComplete="email"
          value={answers.email}
          onChange={(email) => update({ email })}
          error={errors.email}
          invalid={Boolean(errors.reach)}
          describedBy={errors.reach ? "quote-reach-error" : "quote-reach-hint"}
        />
      </div>
      {errors.reach ? (
        <p id="quote-reach-error" className="mt-1.5 font-ledger text-[14px] text-[#9B2C1F]">
          {errors.reach}
        </p>
      ) : (
        <p id="quote-reach-hint" className="mt-1.5 font-ledger text-[14px] text-[#26272E]/70">
          Dovoljan je telefon ili email.
        </p>
      )}
    </div>
    <ChipGroup
      legend="Kako da vas kontaktiramo?"
      type="radio"
      name="quote-method"
      options={contactMethods}
      isChecked={(option) => answers.method === option}
      onPick={(method) => update({ method })}
    />
    <div>
      <ChipGroup
        legend="Gde je prostor?"
        type="radio"
        name="quote-place"
        options={[...locations, OTHER_PLACE]}
        isChecked={(option) => answers.place === option}
        onPick={(place) => update({ place })}
      />
      {answers.place === OTHER_PLACE && (
        <div className="mt-3">
          <TextField id="quote-other-place" label="Koje mesto?" value={answers.otherPlace} onChange={(otherPlace) => update({ otherPlace })} />
        </div>
      )}
    </div>
    <ChipGroup
      legend="Kada vam treba?"
      type="radio"
      name="quote-timeframe"
      options={timeframes}
      isChecked={(option) => answers.timeframe === option}
      onPick={(timeframe) => update({ timeframe })}
    />
    <TextField id="quote-budget" label="Okvirni budžet" hint="opciono" value={answers.budget} onChange={(budget) => update({ budget })} />
    <div>
      <label className="flex cursor-pointer items-start gap-3 font-ledger text-[15px]">
        <input
          id="quote-consent"
          type="checkbox"
          checked={answers.consent}
          onChange={() => update({ consent: !answers.consent })}
          aria-invalid={Boolean(errors.consent) || undefined}
          aria-describedby={errors.consent ? "quote-consent-error" : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#5E3D25]"
        />
        <span>Pristajem da Bottega koristi ove podatke samo da bi mi pripremila ponudu.</span>
      </label>
      {errors.consent && (
        <p id="quote-consent-error" className="mt-1.5 font-ledger text-[14px] text-[#9B2C1F]">
          {errors.consent}
        </p>
      )}
    </div>
  </div>
);

ContactStep.propTypes = stepProps;
