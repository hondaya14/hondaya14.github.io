"use client";

import { useEffect } from "react";
import { LM } from "@/lib/global";

export function Log() {
  useEffect(() => {
    console.log(LM);
  }, []);
  return null;
}
