"use client";

import { client } from "@/app/utils/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
interface SelectQueryProps {
  type: keyof typeof client;
  /* tslint:disable-next-line */
  variables?: any; // Adjust the type as needed
  placeholder?: string;
  value?: string | number;
  onChange?: (value: number | undefined) => void;
}

export const SelectQuery = ({
  type,
  variables,
  placeholder,
  value,
  onChange,
  ...rest
}: SelectQueryProps) => {
  const { data } = useQuery({
    queryKey: ["SelectQuery", type, variables],
    queryFn: async () => {
      const result = await client[type](variables);
      /* tslint:disable-next-line */
      return (result as Record<string, any[]>)[type];
    },
  });
  const handleChange = (val: string) => {
    onChange && onChange(Number(val));
  };
  return (
    <Select
      value={!value ? undefined : value.toString()}
      onValueChange={handleChange}
      {...rest}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.map((item: { id: string; title: string }) => (
            <SelectItem key={item.id} value={item.id}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
