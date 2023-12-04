//@ts-nocheck
import { Fragment, useState, forwardRef } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { getNestedAttribute } from "../utils";

interface GenericComboboxProps {
  options: any[];
  valueKey: any;
  displayKey: any;
  selected: any;
  setSelected: any;
  title: string;
  isMultiple?: boolean;
  styles?: string;
  allowCustomValues?: boolean;
  isRequired?: boolean;
}

function getNestedValue(obj: any, path: string): any {
  const keys = path.split("?.");
  return getNestedAttribute(obj, keys);
}

export default function Combo({
  options,
  title,
  selected,
  setSelected,
  valueKey,
  displayKey,
  styles,
  isMultiple,
  allowCustomValues,
  isRequired,
}: GenericComboboxProps) {
  const [query, setQuery] = useState("");
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option: any) => {
          const optionValue = String(getNestedValue(option, displayKey))
            .toLowerCase()
            .replace(/\s+/g, "");
          const queryValue = query.toLowerCase().replace(/\s+/g, "");
          return optionValue.includes(queryValue);
        });

  const comboProps = {
    value: selected,
    onChange: setSelected,
  };

  const comboMultipleProps = {
    ...comboProps,
    multiple: true,
  };

  return (
    <div className={`fixed top-16  z-50 ${styles}`}>
      <label className=" font-semibold mb-2">
        {title}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <Combobox {...(isMultiple ? comboMultipleProps : comboProps)}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              placeholder="Select or type to search"
              displayValue={(v) =>
                isMultiple ? null : getNestedValue(v, displayKey)
              }
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-scroll rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                  {allowCustomValues && (
                    <Combobox.Option value={{ id: null, name: query }}>
                      <div className="mt-3">
                        Create new{" "}
                        {title.toLowerCase().slice(0, title.length - 1)}
                        <span className="text-primary font-bold cursor-pointer">
                          {" "}
                          "{query}"{" "}
                        </span>
                      </div>
                    </Combobox.Option>
                  )}
                </div>
              ) : (
                filteredOptions.map((option: any) => (
                  <Combobox.Option
                    key={option[valueKey]}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {getNestedValue(option, displayKey)}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
