import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ParticlesBackground from "../components/ParticlesBackground.jsx";
import SectionHeading from "../components/ui/SectionHeading";
import SpotlightCard from "../components/ui/SpotlightCard";
import MagneticButton from "../components/ui/MagneticButton";
import Confetti from "../components/ui/Confetti";
import Astra from "../assets/Astra.png";

const FORMSPREE_URL = "https://formspree.io/f/xjkwqwne";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emptyForm = { name: "", email: "", service: "", idea: "" };

const fieldBase =
  "peer block w-full rounded-lg bg-white/[0.04] border px-4 pt-6 pb-2 text-white outline-none transition-colors duration-300 placeholder-transparent focus:bg-white/[0.07]";
const labelBase =
  "pointer-events-none absolute left-4 top-4 text-white/50 transition-all duration-200 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-brand-cyan peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]";

function Field({ id, label, error, children }) {
  return (
    <div>
      <div className="relative">
        {children}
        <label htmlFor={id} className={labelBase}>
          {label} <span className="text-brand-green">*</span>
        </label>
        {/* focus underline that grows from the centre */}
        <span className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-green transition-all duration-300 peer-focus:w-full" />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 font-mono text-[11px] text-red-400"
          >
            ✗ {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [burst, setBurst] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
    if (status === "error" || status === "success") setStatus("");
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(emptyForm).forEach((f) => {
      if (!formData[f].trim()) newErrors[f] = "required field";
    });
    if (formData.email.trim() && !EMAIL_RE.test(formData.email.trim())) newErrors.email = "invalid email format";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        setBurst((b) => b + 1);
        setFormData(emptyForm);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Formspree Error:", err);
      setStatus("error");
    }
  };

  const border = (name) => (errors[name] ? "border-red-500/70" : "border-white/15 focus:border-brand-cyan/60");

  return (
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-24 px-6 md:px-20">
      <ParticlesBackground />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-brand-cyan/10 blur-[140px] animate-aurora" />
      </div>

      <SectionHeading
        index="09"
        eyebrow="contact"
        title="Let's Build Something"
        subtitle="Got an idea, a role, or a bug that needs squashing? Send a request — I respond fast."
        className="mb-14"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <motion.img
            src={Astra}
            alt="Astronaut illustration"
            className="w-72 md:w-full max-w-[520px] rounded-2xl object-cover drop-shadow-[0_0_40px_rgba(28,216,210,0.2)]"
            animate={{ y: [0, -14, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <SpotlightCard className="rounded-2xl bg-black/60 backdrop-blur-md shadow-[0_0_60px_rgba(28,216,210,0.08)]">
            <div className="p-6 sm:p-8">
              <p className="font-mono text-xs text-white/40 mb-6">
                <span className="text-brand-green">POST</span> /api/contact <span className="text-white/30">HTTP/1.1</span>
              </p>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                <Field id="contact-name" label="Name" error={errors.name}>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`${fieldBase} ${border("name")}`}
                  />
                </Field>

                <Field id="contact-email" label="Email" error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`${fieldBase} ${border("email")}`}
                  />
                </Field>

                <div className="relative">
                  <label htmlFor="contact-service" className="block mb-1.5 text-xs text-white/50">
                    Service needed <span className="text-brand-green">*</span>
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.service)}
                    className={`w-full rounded-lg bg-white/[0.04] border px-4 py-3 outline-none transition-colors ${border("service")} ${
                      formData.service ? "text-white" : "text-white/50"
                    }`}
                  >
                    <option value="" disabled>
                      Something in mind?
                    </option>
                    <option value="Web Development" className="text-black">
                      Full Stack Web Development
                    </option>
                    <option value="Mobile Application" className="text-black">
                      Mobile Application
                    </option>
                    <option value="Hiring" className="text-black">
                      Hiring / Job Opportunity
                    </option>
                    <option value="Others" className="text-black">
                      Others
                    </option>
                  </select>
                  {errors.service && <p className="mt-1 font-mono text-[11px] text-red-400">✗ {errors.service}</p>}
                </div>

                <Field id="contact-idea" label="Your idea" error={errors.idea}>
                  <textarea
                    id="contact-idea"
                    name="idea"
                    rows={5}
                    placeholder="Your idea"
                    value={formData.idea}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.idea)}
                    aria-describedby={errors.idea ? "contact-idea-error" : undefined}
                    className={`${fieldBase} ${border("idea")} resize-none`}
                  />
                </Field>

                <div className="relative">
                  <Confetti burstKey={burst} />
                  <MagneticButton as="button" type="submit" disabled={status === "sending"} strength={0.2} className="w-full !rounded-lg">
                    {status === "sending" ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                        Sending…
                      </>
                    ) : status === "success" ? (
                      <>
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={3}>
                          <motion.path
                            d="M5 13l4 4L19 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </svg>
                        Sent!
                      </>
                    ) : (
                      <>
                        <FiSend /> Send Request
                      </>
                    )}
                  </MagneticButton>
                </div>

                <AnimatePresence mode="wait">
                  {status && (
                    <motion.p
                      key={status}
                      role="status"
                      initial={{ opacity: 0, y: 6 }}
                      animate={status === "error" ? { opacity: 1, y: 0, x: [0, -8, 8, -6, 6, 0] } : { opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`font-mono text-xs ${
                        status === "success" ? "text-brand-green" : status === "error" ? "text-red-400" : "text-yellow-300"
                      }`}
                    >
                      {status === "sending" && "→ POST /api/contact … awaiting response"}
                      {status === "success" && "← 201 Created ✓ — message delivered, I'll reply soon."}
                      {status === "error" && "← 500 Internal Error ✗ — something went wrong, please retry."}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
