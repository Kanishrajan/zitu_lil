
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="ZITU"
      {...props}
    >
      <path d="M7 4h10v2L7 20H4l10-16h3v2L7 20v-2h10" fill="currentColor" stroke="none" />
    </svg>
  );
}
