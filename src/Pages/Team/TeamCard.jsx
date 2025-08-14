import { motion } from 'framer-motion';

const TeamCard = ({ member }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 1 }}
      className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-6 flex flex-col items-center transition duration-300 ease-in-out hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
    >
      <div className="relative">
        <img
          src={member.photo}
          alt={member.name}
          className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
        />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
      </div>
      <h3 className="text-2xl font-bold mt-4 tracking-wide">{member.name}</h3>
      <p className="text-sm mt-1 italic opacity-90">{member.role}</p>
      <div className="mt-4 w-16 h-1 bg-white/40 rounded-full"></div>
    </motion.div>
  );
};

export default TeamCard;