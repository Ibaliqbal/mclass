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
}: {
  value: string;
  type: "missing" | "not-turned-in" | "turned-in";
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
        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
        <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
        <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
        <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
        <SelectItem value="ist_indonesia">
          Indonesia Central Standard Time (WITA)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectTask;
