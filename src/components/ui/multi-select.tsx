"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/app/utils/api";

export type Framework = Record<"value" | "label" | "id", string | number>;

export interface FancyMultiSelectProps {
  selected: Framework[];
  onSelectedChange: (selected: Framework[]) => void;
  options: Framework[];
}

export function FancyMultiSelect({
  selected,
  onSelectedChange,
  options,
}: FancyMultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback(
    (framework: Framework) => {
      onSelectedChange(selected.filter((s) => s.value !== framework.value));
    },
    [onSelectedChange, selected]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            onSelectedChange(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, onSelectedChange]
  );

  const selectables = options.filter(
    (framework) => !selected.some((it) => it.value === framework.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select frameworks..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue("");
                        onSelectedChange([...selected, framework]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
interface SelectQueryProps {
  type: keyof typeof client;
  /* tslint:disable-next-line */
  variables?: any; // Adjust the type as needed
  placeholder?: string;
  selected: (number | string | undefined)[];
  onSelectedChange: (selected: (number | string | undefined)[]) => void;
  nameLabel?: string;
  nameValue?: string;
  typeValue?: string;
}
export function SelectQueryMulti({
  onSelectedChange,
  selected = [],
  variables,
  type,
  nameLabel = "title",
  nameValue = "slug",
  typeValue = "string",
}: SelectQueryProps) {
  const { data } = useQuery({
    queryKey: ["SelectQueryMulti", type, variables],
    queryFn: async () => {
      const result = await client[type](variables);
      /* tslint:disable-next-line */
      return (result as Record<string, any[]>)[type];
    },
  });
  console.log("selected", selected);
  const handleSelected = (val: Framework[]) => {
    onSelectedChange &&
      onSelectedChange(
        val.map((it) => (typeValue === "number" ? Number(it.value) : it.value))
      );
  };
  const opts =
    data?.map((it) => ({
      label: it[nameLabel],
      value: it[nameValue].toString(),
      id: it.id,
    })) || [];
  const value = selected.map((it) => {
    const found = opts.find((o) =>
      typeValue === "number" ? Number(o.value) === it : o.value === it
    );
    return (
      found || {
        label: "No Label",
        value: it,
        id: it,
      }
    );
  });
  return (
    <FancyMultiSelect
      onSelectedChange={handleSelected}
      selected={value}
      options={opts}
    />
  );
}
