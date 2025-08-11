import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faRss, faLink } from "@fortawesome/free-solid-svg-icons";
import { lineSeedFont } from "@/lib/fonts";

// const ZennIcon = () => {
//   return (
//     <Image 
//       src="/zenn-logo-only.svg"
//       alt="Zenn Icon"
//       width={40}
//       height={40}
//       className="w-10 h-10"
//       title="Zenn"
//     />
//   );
// };

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      <div className="relative p-12 sm:p-20 rounded-2xl shadow-lg">
        <div className="absolute inset-0 rounded-2xl bg-white/60 backdrop-blur-md"></div>
        <h1 className={`relative text-5xl sm:text-7xl font-semibold text-center z-10 ${lineSeedFont.className}`}>
          Yasuhisa Honda
        </h1>
        <h3 className="relative mt-6 text-2xl text-center z-10">
          Software Engineer
        </h3>
        <div className="flex justify-center gap-6 relative mt-6 text-2xl text-center z-10">
          <Link title="Blog" href="./blog">
            <FontAwesomeIcon icon={faRss} className="w-9"/>
          </Link>
          <Link title="Links" href="./links">
            <FontAwesomeIcon icon={faLink} className="w-12"/>
          </Link>
          <Link title="GitHub" href="https://github.com/hondaya14" target="_blank">
            <FontAwesomeIcon icon={faGithub} className="w-10 "/>
          </Link>
          <Link title="X" href="https://x.com/hondaya14" target="_blank">
            <FontAwesomeIcon icon={faXTwitter} className="w-11 "/>
          </Link>
          <Link title="LinkedIn" href="https://www.linkedin.com/in/yasuhisa-honda-5a5470274/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className="w-10 "/>
          </Link>
          {/* <Link title="Instagram" href="https://www.instagram.com/nqv_no" target="_blank">
            <FontAwesomeIcon icon={faInstagram} className="w-10 "/>
          </Link> */}
          {/* <Link title="Zenn" href="https://zenn.dev/hondaya14" target="_blank">
            <ZennIcon/>
          </Link> */}
        </div>
      </div>
    </div>
  );
}