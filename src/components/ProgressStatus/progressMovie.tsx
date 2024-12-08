import { UserContext } from "@/context/user";
import React, { useContext, useEffect, useState } from "react";

interface Props {
  popularity: number;
  size: number;
  popularityMax: number;
}

export default function ProgressMovie({
  popularity,
  size,
  popularityMax,
}: Props) {
  const { movies, popularMovies } = useContext(UserContext);
  const [porcentaje, setPorcentaje] = useState<number>(0);

  useEffect(() => {
    const porcentaje = (popularity * 100) / popularityMax;
    setPorcentaje(Math.round(porcentaje));
  }, [movies, popularMovies]);

  return (
    <div className="rating">
      <svg width={size} height={size} viewBox="0 0 250 250">
        <circle
          className="bg"
          cx="125"
          cy="125"
          r="92"
          fill="transparent"
          stroke="#4da14e64"
          strokeWidth="10"
        ></circle>
        <circle
          className="fg"
          cx="125"
          cy="125"
          r="92"
          fill="transparent"
          stroke=" #4da14f"
          strokeWidth="10"
          strokeDasharray="600"
          strokeDashoffset={600 - (porcentaje * 600) / 100}
          transform="rotate(-90, 125, 125)"
        ></circle>
        <text
          fill="white"
          x="125"
          y="125"
          alignmentBaseline="middle"
          textAnchor="middle"
          style={{ fontSize: "40px", fontWeight: "bold" }}
        >
          {Math.round(porcentaje)}%
        </text>
      </svg>
    </div>
  );
}
