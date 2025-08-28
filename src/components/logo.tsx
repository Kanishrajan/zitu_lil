import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 24"
      width="100"
      height="24"
      fill="currentColor"
      aria-label="ZITU"
      {...props}
    >
      <text
        x="0"
        y="18"
        fontFamily="'Inter', sans-serif"
        fontSize="24"
        fontWeight="bold"
        letterSpacing="2"
      >
        ZITU
      </text>
    </svg>
  );
}
