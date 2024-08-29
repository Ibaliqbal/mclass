"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";

const SelectTask = ({
  value,
  type,
  listClass,
}: {
  value: string;
  type: "missing" | "not-turned-in" | "turned-in";
  listClass: Array<{ code: string; className: string }>;
}) => {
  const router = useRouter();

  const handleSelectChange = (value: string) => {
    router.push(`/t/${type}/${value}`);
  };

  return (
    <Select defaultValue={value} onValueChange={handleSelectChange}>
      <SelectTrigger className="w-[350px] h-12">
        <SelectValue placeholder="Select a timezone" className="py-4" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Class</SelectItem>
        {listClass.map((list) => (
          <SelectItem key={list.code} value={list.code}>
            {list.className}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectTask;
