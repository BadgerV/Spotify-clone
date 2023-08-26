"use client";
import { useRouter } from "next/navigation";

interface ListItemsProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemsProps> = ({ image, name, href }) => {
  const router = useRouter();

  const onClick = () => {
    //add authentication before push
    router.push(href);
  };
  return (
    <button className="relative group flex itemspcenter rounded-md overflow-hidded gap-x-4 bg-neutral-200/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image />
      </div>
    </button>
  );
};

export default ListItem;
