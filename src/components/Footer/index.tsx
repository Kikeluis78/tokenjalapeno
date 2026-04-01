import { FaFacebook, FaTelegram, FaYoutube } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-linear-to-r from-purple-800 to-pink-700 py-2 px-4">
      <div className="flex items-center justify-center gap-12">
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          aria-label="Facebook"
        >
          <FaFacebook size={36} className="text-[#1877F2]" />
        </a>
        
        <a 
          href="https://t.me" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          aria-label="Telegram"
        >
          <FaTelegram size={36} className="text-[#26A5E4]" />
        </a>
        
        <a 
          href="https://youtube.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          aria-label="YouTube"
        >
          <FaYoutube size={36} className="text-[#FF0000]" />
        </a>
      </div>
    </footer>
  );
}
