
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="32"
      viewBox="0 0 122 32"
      fill="currentColor"
      aria-label="ZITU"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Brush Script MT, Brush Script Std, cursive"
        fontSize="30"
        fontStyle="italic"
      >
        ZITU
      </text>
    </svg>
  );
}
