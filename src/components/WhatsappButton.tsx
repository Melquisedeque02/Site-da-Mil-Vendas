import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsappButton = () => {
  return (
    <motion.a
      href="https://wa.me/244900000000" // Substitua pelo seu número
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] cursor-pointer flex items-center justify-center"
    >
      <MessageCircle size={35} />
    </motion.a>
  );
};

export default WhatsappButton;