import { profile } from "../../data/profile";
import { skillCategories } from "../../data/skills";
import { experiences } from "../../data/experience";
import { educations } from "../../data/education";
import { certifications } from "../../data/certifications";
import { achievements } from "../../data/achievements";
import { sections } from "../../data/sections";

// A line is { type, text, href? } where type is one of:
// out | dim | accent | ok | err | link | pre
const out = (text) => ({ type: "out", text });
const dim = (text) => ({ type: "dim", text });
const accent = (text) => ({ type: "accent", text });
const ok = (text) => ({ type: "ok", text });
const err = (text) => ({ type: "err", text });
const link = (text, href) => ({ type: "link", text, href });
const pre = (text) => ({ type: "pre", text });

const sectionIds = sections.map((s) => s.id);
const files = ["resume.pdf", "secrets.txt", "README.md"];
const skillKeys = skillCategories.map((c) => c.key);

const skillAliases = { db: "databases", database: "databases", fe: "frontend", be: "backend" };

const neofetchLogo = [
  "     /\\      ",
  "    /  \\     ",
  "   / /\\ \\    ",
  "  / ____ \\   ",
  " /_/    \\_\\  ",
  "             ",
];

export const commands = {
  help: {
    desc: "list available commands",
    run: () => [
      accent("Available commands:"),
      ...Object.entries(commands)
        .filter(([, c]) => !c.hidden)
        .map(([name, c]) => pre(`  ${name.padEnd(14)} ${c.desc}`)),
      dim("tip: ↑/↓ for history · Tab to autocomplete · Ctrl+L to clear"),
    ],
  },

  whoami: {
    desc: "who is ankit?",
    run: () => [
      accent(profile.name),
      out(`${profile.title} · ${profile.location}`),
      out(profile.bio),
    ],
  },

  about: {
    desc: "the longer story",
    run: () => [out(profile.bio), out(profile.bioLong), ok(profile.availability)],
  },

  skills: {
    desc: "tech stack  [frontend|backend|db|tools]",
    run: (args) => {
      const wanted = skillAliases[args[0]] || args[0];
      const cats = wanted ? skillCategories.filter((c) => c.key === wanted) : skillCategories;
      if (!cats.length) return [err(`unknown category: ${args[0]}`), dim(`try: ${skillKeys.join(" | ")}`)];
      return cats.flatMap((c) => [
        accent(`▸ ${c.title} (${c.skills.length})`),
        out(`  ${c.skills.map((s) => s.name).join(" · ")}`),
      ]);
    },
  },

  experience: {
    desc: "work history as git log",
    run: () =>
      [...experiences].reverse().flatMap((e, i) => [
        pre(`commit ${e.commit}${i === 0 ? "  (HEAD -> main)" : ""}`),
        dim(`Date:   ${e.duration}`),
        out(`    ${e.role} @ ${e.company}`),
        dim(`    ${e.description}`),
        out(""),
      ]),
  },

  education: {
    desc: "academic background",
    run: () => educations.flatMap((e) => [accent(`${e.tag}  ${e.degree}`), dim(`      ${e.school} · ${e.year}`)]),
  },

  certs: {
    desc: "certifications",
    run: () => [
      ...certifications.map((c) => out(`✓ ${c.title} — ${c.issuer} (${c.date})`)),
      link("→ open the certificate book", "#certifications"),
    ],
  },

  achievements: {
    desc: "beyond the code",
    run: () => achievements.map((a) => out(`🏆 ${a.title} — ${a.subtitle} (${a.level})`)),
  },

  contact: {
    desc: "get in touch",
    run: (_, ctx) => {
      ctx.scrollTo("contact", 1200);
      return [
        ...profile.socials.map((s) => link(`${s.label.padEnd(9)} ${s.href}`, s.href)),
        ok("opening contact form…"),
      ];
    },
  },

  socials: {
    desc: "social links",
    run: () => profile.socials.map((s) => link(`${s.label.padEnd(9)} ${s.href}`, s.href)),
  },

  resume: {
    desc: "download my resume",
    run: (_, ctx) => {
      ctx.download(profile.resumeUrl);
      return [ok(`downloading ${profile.resumeUrl.slice(1)} …`), dim("thanks for your interest!")];
    },
  },

  ls: {
    desc: "list sections & files",
    run: () => [
      pre(sectionIds.map((id) => `${id}/`).join("  ")),
      pre(files.join("  ")),
    ],
  },

  cd: {
    desc: "jump to a section  (cd skills)",
    run: (args, ctx) => {
      const target = (args[0] || "").replace(/\/$/, "");
      if (!target || target === "~") return [dim("already home. try: cd skills")];
      if (target === "..") return [err("permission denied: you can't leave, the portfolio is too good 😄")];
      if (!sectionIds.includes(target)) return [err(`cd: no such directory: ${target}`), dim(`try: ${sectionIds.join(" ")}`)];
      ctx.scrollTo(target, 500);
      return [ok(`navigating to ~/${target} …`)];
    },
  },

  cat: {
    desc: "read a file",
    run: (args, ctx) => {
      const f = args[0];
      if (!f) return [err("usage: cat <file>")];
      if (f === "resume.pdf") return [err("cat: resume.pdf: binary file — try `resume` instead")];
      if (f === "secrets.txt")
        return [out("secret #1: I console.log() more than I'd admit."), out("secret #2: my best code happens after midnight ☕")];
      if (f === "README.md") return commands.whoami.run([], ctx);
      if (sectionIds.includes(f.replace(/\/$/, ""))) return [err(`cat: ${f}: is a directory`)];
      return [err(`cat: ${f}: no such file`)];
    },
  },

  neofetch: {
    desc: "system info",
    run: () => {
      const info = [
        `${profile.firstName.toLowerCase()}@portfolio`,
        "-----------------",
        "OS:       MERN Stack x86_64",
        "Host:     JoulestoWatts · SDE",
        `Uptime:   coding since 2021`,
        "Shell:    zsh + caffeine",
        "Frontend: React, Next.js, Tailwind",
        "Backend:  Node.js, Express, REST",
        "Database: MongoDB, MySQL, PostgreSQL",
        `Location: ${profile.location}`,
      ];
      return info.map((row, i) => pre(`${neofetchLogo[i] ?? " ".repeat(13)}  ${row}`));
    },
  },

  sudo: {
    desc: "try it 😉  (sudo hire-me)",
    run: (args, ctx) => {
      if (args.join(" ") === "hire-me") {
        ctx.celebrate();
        ctx.scrollTo("contact", 1800);
        return [
          ok("[sudo] password for recruiter: ********"),
          ok("✓ access granted. Excellent decision."),
          accent("🎉 Ankit has been added to your team. Redirecting to contact…"),
        ];
      }
      return [err(`${profile.firstName.toLowerCase()} is not in the sudoers file. This incident will be reported.`), dim("hint: sudo hire-me")];
    },
  },

  echo: {
    desc: "print text",
    run: (args) => [out(args.join(" "))],
  },

  date: {
    desc: "current date",
    run: () => [out(new Date().toString())],
  },

  clear: {
    desc: "clear the terminal",
    run: (_, ctx) => {
      ctx.clear();
      return [];
    },
  },

  // Hidden extras
  exit: { hidden: true, desc: "", run: () => [err("there is no escape 👀 — try `contact` instead")] },
  rm: { hidden: true, desc: "", run: () => [err("nice try 🙂 permission denied")] },
  git: {
    hidden: true,
    desc: "",
    run: (args, ctx) => (args[0] === "log" ? commands.experience.run([], ctx) : [err(`git: '${args[0] ?? ""}' — only 'git log' works here`)]),
  },
  pwd: { hidden: true, desc: "", run: () => [out("/home/ankit/portfolio")] },
  vim: { hidden: true, desc: "", run: () => [err("you'd never get out. :q!")] },
};

export const commandNames = Object.keys(commands);

export function execute(input, ctx) {
  const [name, ...args] = input.trim().split(/\s+/);
  const cmd = commands[name.toLowerCase()];
  if (!cmd) return [err(`command not found: ${name}`), dim("type 'help' to see available commands")];
  return cmd.run(args, ctx);
}

// Returns the completion candidates for the current input.
export function complete(input) {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    return commandNames.filter((n) => !commands[n].hidden && n.startsWith(parts[0] || ""));
  }
  const [cmd, partial = ""] = [parts[0], parts[parts.length - 1]];
  const pool =
    cmd === "cd" ? sectionIds : cmd === "cat" ? [...files, ...sectionIds.map((s) => `${s}/`)] : cmd === "skills" ? [...skillKeys, "db"] : cmd === "sudo" ? ["hire-me"] : [];
  return pool.filter((p) => p.startsWith(partial)).map((p) => [...parts.slice(0, -1), p].join(" "));
}
