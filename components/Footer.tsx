import ContainerWidth from "./ContainerWidth";

export default function Footer() {
  return (
    <ContainerWidth>
      <div className="bg-transparent  backdrop-blur-lg border-t border-white/30 text-white  flex justify-between flex-col md:flex-row gap-3 items-center rounded-lg  md:p-6 p-3  w-full">
        <h2 className="text-xl font-medium">create by ziad alaa</h2>
        <ul className="flex justify-between items-center gap-6">
          <li className="text-[12px]">
            <a href="#">Terms</a>
          </li>
          <li className="text-[12px]"> 
            <a href="#">Privacy Policy</a>
          </li>
          <li className="text-[12px]">
            <a href="#">Cookie Policy</a>
          </li>
        </ul>
      </div>
    </ContainerWidth>
  );
}
