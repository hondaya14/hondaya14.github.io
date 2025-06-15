import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { faRss } from "@fortawesome/free-solid-svg-icons";

const ZennIcon = () => {
  return (
    <Image 
      src="/zenn-logo-only.svg"
      alt="Zenn Icon"
      width={40}
      height={40}
      className="w-10 h-10"
      title="Zenn"
    />
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="relative p-8 sm:p-12 rounded-lg">
        <div className="absolute inset-0 rounded-md backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100"></div>
        <h1 className="relative text-4xl sm:text-6xl font-bold text-center z-10">
          Honda Yasuhisa
        </h1>
        <h3 className="relative mt-4 text-xl text-center z-10">
          Software Engineer
        </h3>
        <div className="flex justify-center gap-4 relative mt-4 text-xl text-center z-10">
          <Link title="Blog" href="./blog">
            <FontAwesomeIcon icon={faRss} className="w-10 "/>
          </Link>
          <Link title="GitHub" href="https://github.com/hondaya14" target="_blank">
            <FontAwesomeIcon icon={faGithub} className="w-10 "/>
          </Link>
          <Link title="X" href="https://x.com/hondaya14" target="_blank">
            <FontAwesomeIcon icon={faXTwitter} className="w-10 "/>
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