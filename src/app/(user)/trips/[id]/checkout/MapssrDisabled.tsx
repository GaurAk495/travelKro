"use client";
import dynamic from "next/dynamic";
import React from "react";
const MyMap = dynamic(() => import("../../create/MyMap"), { ssr: false });

function MapssrDisabled({ coordinates }: { coordinates: [number, number] }) {
  return <MyMap position={coordinates} />;
}

export default MapssrDisabled;
