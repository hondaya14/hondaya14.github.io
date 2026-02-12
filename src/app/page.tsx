import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { faRss, faLink } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Log } from "@/components/LogClient";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#101114] text-foreground px-4">
      <div className="flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Icon */}
        <img
          src="/hondayaicon.png"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover"
        />

        {/* Name */}
        <h2 className="text-2xl sm:text-2xl font-normal text-center tracking-tight">
          Yasuhisa Honda
        </h2>

        {/* Role */}
        <p className="text-xs sm:text-sm font-light text-center text-gray-600">Software Engineer</p>

        {/* Links */}
        <div className="flex justify-center gap-6 mt-4">
          <Link
            title="Blog"
            href="/blog"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faRss} className="w-6 h-6" />
          </Link>
          <Link
            title="Links"
            href="/links"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faLink} className="w-6 h-6" />
          </Link>
          <Link
            title="GitHub"
            href="https://github.com/hondaya14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faGithub as IconProp} className="w-6 h-6" />
          </Link>
          <Link
            title="X"
            href="https://x.com/hondaya14"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faXTwitter as IconProp} className="w-6 h-6" />
          </Link>
          <Link
            title="LinkedIn"
            href="https://www.linkedin.com/in/yasuhisa-honda-5a5470274/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faLinkedin as IconProp} className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <Log />
    </div>
  );
}
