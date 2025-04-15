"use client";

interface WaveDividerProps {
  color?: string;
}

export default function WaveDivider({ color = "#00ADEF" }: WaveDividerProps) {
  return (
    <div className="relative w-full overflow-hidden leading-none">
      <svg
        className="absolute block w-full h-20 top-0"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={color}
          fillOpacity="1"
          d="M0,128L30,138.7C60,149,120,171,180,186.7C240,203,300,213,360,197.3C420,181,480,139,540,133.3C600,128,660,160,720,186.7C780,213,840,235,900,224C960,213,1020,171,1080,165.3C1140,160,1200,192,1260,208C1320,224,1380,224,1410,224L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        />
      </svg>
    </div>
  );
}
