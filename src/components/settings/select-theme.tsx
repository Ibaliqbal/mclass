import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string | undefined;
  onChnage: (value: string) => void;
};

const SelectTheme = ({ value, onChnage }: Props) => {
  return (
    <Select defaultValue={value} onValueChange={onChnage}>
      <SelectTrigger className="w-36 h-12">
        <SelectValue placeholder="Select a your theme" className="py-4" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectTheme;
