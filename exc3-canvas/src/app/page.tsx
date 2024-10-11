import dynamic from "next/dynamic";

const CanvasDraw = dynamic(() => import('..//components/CanvasDraw'), {ssr: false})

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-5 font-[family-name:var(--font-geist-sans)]">
      <h1 className="mb-2">Quadro Negro</h1>
      <p className="mb-4">Clique no quadro abaixo para fazer seus desenhos, contas e brincar um pouco!</p>
      <CanvasDraw />
    </div>
  );
}
