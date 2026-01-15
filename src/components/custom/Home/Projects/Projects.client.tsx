"use client";
import React from "react";
import { AutoTextSize } from "auto-text-size";

export function Projects() {
  return (
    <div className="w-full h-full">
      <div className="mx-auto max-w-[calc(100dvh*(5/4))] w-full">
        <div className="max-w-1/2 w-full">
          <AutoTextSize
            as="span"
            maxFontSizePx={1000}
            className="font-bold antialiased text-transparent bg-clip-text font-center bg-gradient-to-r from-palette-lightMuted via-palette-muted to-palette-darkMuted bg-cover bg-center bg-fixed"
          >
            My Projects.
          </AutoTextSize>
        </div>
      </div>
    </div>
  );
}
