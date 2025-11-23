import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faRss, faLink } from "@fortawesome/free-solid-svg-icons";
import { lineSeedFont } from "@/lib/fonts";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Log } from "@/components/LogClient";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101114] text-foreground">
      <div className="relative p-8 sm:p-12 rounded-lg">
        <div className="absolute inset-0 rounded-md backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100"></div>
        <h1 className={`relative text-4xl sm:text-6xl font-semibold text-center z-10 ${lineSeedFont.className}`}>
          <span className="inline-block overflow-hidden whitespace-nowrap [font-family:Menlo,Monaco,Consolas,monospace] border-r border-current [--n:14] w-[14ch] transition-[width] duration-[2000ms] [transition-timing-function:steps(var(--n),_end)] [@starting-style]:w-0 after:w-0 after:ml-[2px] after:border-r after:border-current after:h-[1em] after:animate-pulse">
          Yasuhisa Honda</span>
        </h1>
        <h3 className="relative mt-4 text-xl text-center z-10 ">
          <span className="inline-block overflow-hidden whitespace-nowrap [font-family:Menlo,Monaco,Consolas,monospace] border-r border-current [--n:17] w-[17ch] transition-[width] duration-[2000ms] [transition-timing-function:steps(var(--n),_end)] [@starting-style]:w-0">
            Software Engineer
          </span>
        </h3>
        <div className="flex justify-center gap-4 relative mt-4 text-xl text-center z-10">
          <Link title="Blog" href="blog">
            <FontAwesomeIcon icon={faRss} className="w-9"/>
          </Link>
          <Link title="Links" href="./links">
            <FontAwesomeIcon icon={faLink} className="w-12"/>
          </Link>
          <Link title="GitHub" href="https://github.com/hondaya14" target="_blank">
            <FontAwesomeIcon icon={faGithub as IconProp} className="w-10 "/>
          </Link>
          <Link title="X" href="https://x.com/hondaya14" target="_blank">
            <FontAwesomeIcon icon={faXTwitter as IconProp} className="w-10 "/>
          </Link>
          <Link title="LinkedIn" href="https://www.linkedin.com/in/yasuhisa-honda-5a5470274/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin as IconProp} className="w-10 "/>
          </Link>
        </div>
      </div>
      <Log/>
    </div>
  );
}


