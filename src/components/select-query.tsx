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
import { Button } from "./ui/button";
interface SelectQueryProps {
  type: keyof typeof client;
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
          {data?.map((item: any) => (
            <SelectItem key={item.id} value={item.id}>
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

