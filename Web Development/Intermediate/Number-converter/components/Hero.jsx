import { motion } from "framer-motion";
import chathuman from "../public/images/chathuman.svg";
import chatrobot from "../public/images/chatrobot.svg";
import Image from "next/image";
import computer from "../public/images/computer.png";

const Hero = () => {
  return (
    <section>
      <div className="lg:max-w-3xl md:max-w-2xl mx-auto flex justify-between items-start mt-16">
        {/* ===== left chat ====== */}
        <motion.div
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delayChildren: 0.3,
            staggerChildren: 0.2,
            type: "spring",
          }}
        >
          <Image src={chathuman} alt="human-chat image" className="w-auto" />
        </motion.div>

        {/* ===== right chat ====== */}
        <motion.div
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="mt-14"
        >
          <Image src={chatrobot} alt="robot-chat image" className="w-auto" />
        </motion.div>
      </div>
      <div className="flex items-center justify-center">
        <div className="md:mt-[-5rem] mt-[-2rem]">
          <Image src={computer} alt="computer image" width={450} height={350} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
