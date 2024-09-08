export default function Heading({ text }: { text: string }) {
  return (
    <div className=" py-8  md:py-12">
      <h1 className="xl:text-6xl md:text-5xl text-2xl text-nowrap border-l-[10px] border-white pl-4  content uppercase  text-white font-extrabold">
        {text}
      </h1>
    </div>
  );
}
