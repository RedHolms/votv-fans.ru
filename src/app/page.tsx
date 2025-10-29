import Link from "next/link";
import SpaceBg from "./components/SpaceBg";

const LINKS = [
  {
    name: "Телеграм канал",
    href: "https://t.me/votvrus"
  },
  {
    name: "Телеграм чат",
    href: "https://t.me/+6U-xwLlb9Gw4NmQy"
  },
  {
    name: "Группа VK",
    href: "https://vk.ru/voicesofthevoid_meme"
  },
  {
    name: "Чат VK",
    href: "https://vk.me/join/rEez8Vx7USC5BiGtE0W8HI5ZiK_IfhBiI9o="
  }
];

export default function Home() {
  return (<>
    <SpaceBg />
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center select-none z-[99999]">
      <div className="bg-[#303030ba] p-4 flex flex-col items-center max-w-10/12 md:max-w-full text-center">
        <span className="text-3xl mb-1">VOTV RUSSIAN FANDOM</span>
        <span className="text-sm mb-4">Самый большой фандом по Voices of the Void в России</span>

        {LINKS.map(({ name, href }, index) => 
          <Link
            key={name}
            href={href}
            className={`w-full py-1.5 border-1 border-[#dedede1a] bg-[#dedede08] hover:bg-[#dedede24] transition-colors text-center ${index !== LINKS.length - 1 ? " mb-1.5" : ""}`}
            target="_blank" rel="noopener noreferrer"
          >
            {name}
          </Link>
        )}
      </div>
    </div>
  </>);
}
