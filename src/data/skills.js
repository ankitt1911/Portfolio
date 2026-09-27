import { FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaGitAlt, FaGithub, FaNpm, FaNode } from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiExpress, SiFirebase, SiJavascript, SiMongodb, SiMysql,
  SiPostgresql, SiNodedotjs, SiMui, SiAxios, SiFramer, SiJsonwebtokens, SiTypescript,
  SiRedux, SiPostman, SiShadcnui, SiSocketdotio, SiVercel, SiGreensock,
} from "react-icons/si";
import { MdEmail, MdSchedule } from "react-icons/md";
import { FcDataEncryption } from "react-icons/fc";
import { VscJson } from "react-icons/vsc";
import { AiOutlineCloudServer } from "react-icons/ai";
import { BsFileEarmarkArrowUp, BsShieldCheck } from "react-icons/bs";

// `layer` groups each skill into a tier of the architecture diagram.
export const skillCategories = [
  {
    key: "frontend",
    title: "Frontend",
    skills: [
      { icon: FaReact, name: "React", layer: "client" },
      { icon: SiNextdotjs, name: "Next.js", layer: "client" },
      { icon: FaHtml5, name: "HTML", layer: "client" },
      { icon: FaCss3Alt, name: "CSS", layer: "client" },
      { icon: SiTailwindcss, name: "Tailwind CSS", layer: "client" },
      { icon: FaBootstrap, name: "Bootstrap", layer: "client" },
      { icon: SiMui, name: "Material UI", layer: "client" },
      { icon: SiTailwindcss, name: "Material Tailwind", layer: "client" },
      { icon: SiShadcnui, name: "Shadcn UI", layer: "client" },
      { icon: SiFramer, name: "Framer Motion", layer: "client" },
      { icon: SiGreensock, name: "GSAP", layer: "client" },
      { icon: SiRedux, name: "Redux Toolkit", layer: "client" },
      { icon: SiAxios, name: "Axios", layer: "client" },
      { icon: SiJavascript, name: "JavaScript", layer: "client" },
      { icon: SiTypescript, name: "TypeScript", layer: "client" },
      { icon: SiNodedotjs, name: "Toastify", layer: "client" },
    ],
  },
  {
    key: "backend",
    title: "Backend",
    skills: [
      { icon: FaNode, name: "Node.js", layer: "api" },
      { icon: SiExpress, name: "Express", layer: "api" },
      { icon: SiJsonwebtokens, name: "JWT", layer: "auth" },
      { icon: BsShieldCheck, name: "JOI", layer: "auth" },
      { icon: MdEmail, name: "Nodemailer", layer: "api" },
      { icon: SiSocketdotio, name: "Socket.io", layer: "api" },
      { icon: AiOutlineCloudServer, name: "CORS", layer: "api" },
      { icon: VscJson, name: "Morgan", layer: "api" },
      { icon: BsFileEarmarkArrowUp, name: "Multer", layer: "api" },
      { icon: MdSchedule, name: "Node Cron", layer: "api" },
      { icon: AiOutlineCloudServer, name: "REST API", layer: "api" },
      { icon: FcDataEncryption, name: "Bcrypt", layer: "auth" },
    ],
  },
  {
    key: "databases",
    title: "Databases",
    skills: [
      { icon: SiMongodb, name: "MongoDB", layer: "db" },
      { icon: SiMysql, name: "MySQL", layer: "db" },
      { icon: SiPostgresql, name: "PostgreSQL", layer: "db" },
      { icon: SiFirebase, name: "Firebase", layer: "db" },
    ],
  },
  {
    key: "tools",
    title: "Tools",
    skills: [
      { icon: FaGitAlt, name: "Git", layer: "deploy" },
      { icon: FaGithub, name: "GitHub", layer: "deploy" },
      { icon: FaNpm, name: "NPM", layer: "deploy" },
      { icon: SiPostman, name: "Postman", layer: "deploy" },
      { icon: SiVercel, name: "Vercel", layer: "deploy" },
    ],
  },
];

export const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((s) => ({ ...s, category: c.key }))
);

export const skillsByLayer = (layer) => allSkills.filter((s) => s.layer === layer);
