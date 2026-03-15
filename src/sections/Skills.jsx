import { FaReact, FaHtml5, FaCss3Alt, FaBootstrap, FaGitAlt, FaGithub, FaNpm, FaNode } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiExpress, SiFirebase, SiJavascript, SiMongodb, SiMysql, SiPostgresql, SiNodedotjs, SiMui, SiAxios, SiFramer, SiJsonwebtokens, SiTypescript, SiRedux, SiPostman, SiShadcnui, SiSocketdotio } from 'react-icons/si';
import { MdEmail, MdSchedule } from 'react-icons/md';
import { VscJson } from 'react-icons/vsc';
import { AiOutlineCloudServer } from 'react-icons/ai';
import { BsFileEarmarkArrowUp } from 'react-icons/bs';
import { motion } from 'framer-motion';


export default function Skills() {

const categories = [
  {
    title: "Frontend",
    skills: [
      { icon: <FaReact />, name: "React" },
      { icon: <SiNextdotjs />, name: "Next.js" },
      { icon: <FaHtml5 />, name: "HTML" },
      { icon: <FaCss3Alt />, name: "CSS" },
      { icon: <SiTailwindcss />, name: "Tailwind CSS" },
      { icon: <FaBootstrap />, name: "Bootstrap" },
      { icon: <SiMui />, name: "Material UI" },
      { icon: <SiTailwindcss />, name: "Material Tailwind" },
      { icon: <SiShadcnui />, name: "Shadcn UI" },
      { icon: <SiFramer />, name: "Framer Motion" },
      { icon: <SiFramer />, name: "GSAP" },
      { icon: <SiRedux />, name: "Redux Toolkit" },
      { icon: <SiAxios />, name: "Axios" },
      { icon: <SiJavascript />, name: "JavaScript" },
      { icon: <SiTypescript />, name: "TypeScript" },
      { icon: <SiNodedotjs />, name: "Toastify" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { icon: <FaNode />, name: "Node.js" },
      { icon: <SiExpress />, name: "Express" },
      { icon: <SiJsonwebtokens />, name: "JWT" },
      { icon: <SiJsonwebtokens />, name: "JOI" },
      { icon: <MdEmail />, name: "Nodemailer" },
      { icon: <SiSocketdotio />, name: "Socket.io" },
      { icon: <AiOutlineCloudServer />, name: "CORS" },
      { icon: <VscJson />, name: "Morgan" },
      { icon: <BsFileEarmarkArrowUp />, name: "Multer" },
      { icon: <MdSchedule />, name: "Node Cron" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { icon: <SiMongodb />, name: "MongoDB" },
      { icon: <SiMysql />, name: "MySQL" },
      { icon: <SiPostgresql />, name: "PostgreSQL" },
      { icon: <SiFirebase />, name: "Firebase" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { icon: <FaGitAlt />, name: "Git" },
      { icon: <FaGithub />, name: "GitHub" },
      { icon: <FaNpm />, name: "NPM" },
      { icon: <SiPostman />, name: "Postman" },
    ],
  },
];

  return(
    <section id="skills"
    className="w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      <div className='absolute inset-0 pointer-events-none'>
<div className='absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
opacity-20 blur-[120px] animate-pulse
'/>
<div className='absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
opacity-20 blur-[120px] animate-pulse delay-500
' />

      </div>

      <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10'
      initial={{opacity:0 , y: -30}}
      whileInView={{opacity:1 , y:0}}
      transition={{duration:0.5 , delay:0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
      initial={{opacity:0 , y: -10}}
      whileInView={{opacity:1 , y:0}}
      transition={{duration:0.5 , delay:0.1 }}

      >
Modern Applications | Modern Technologies
      </motion.p>

<div className='w-full max-w-5xl px-8 z-10 flex flex-col gap-10'>
  {categories.map((cat, ci) => (
    <motion.div
      key={cat.title}
      initial={{opacity:0 , y: 30}}
      whileInView={{opacity:1 , y: 0}}
      transition={{duration:0.4 , delay: ci * 0.1}}
      className='rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6'
    >
      <h3 className='text-xl font-semibold mb-5 text-[#1cd8d2] tracking-wide'>
        {cat.title}
      </h3>
      <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-6 justify-items-center text-4xl sm:text-5xl text-[#1cd8d2]'>
        {cat.skills.map((s, i) => (
          <motion.div
            key={i}
            className='flex flex-col items-center gap-2'
            aria-label={s.name}
            title={s.name}
            initial={{opacity:0 , scale: 0.8}}
            whileInView={{opacity:1 , scale: 1}}
            transition={{duration:0.3 , delay: i * 0.03}}
          >
            <span className='hover:scale-125 transition-transform duration-300'>
              {s.icon}
            </span>
            <p className='text-xs sm:text-sm text-white/80 text-center'>
              {s.name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  ))}
</div>


    </section>
  )
}
