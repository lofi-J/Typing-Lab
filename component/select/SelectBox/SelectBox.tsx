import "./SelectBox.css";
import {indexToKey} from "@/utils/playgroundHelper";
import React, {CSSProperties, useId, useState} from "react";
import useCloseOutside from "@/hooks/useCloseOutside";


type TOption = {value: string, label: string};

interface ISelectBox {
  options: TOption[];
  setter: React.Dispatch<React.SetStateAction<any>>;
}

const SelectBox = ({options, setter}: ISelectBox) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState<string>(options.length && options[0].label || 'choose a type');
  const close = () => setIsOpen(false);
  const ref = useCloseOutside(close);
  
  const inlineUlStyle: CSSProperties = {
    display: isOpen ? 'flex' : 'none'
  }
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }
  
  const onChange = (data: TOption) => {
    setter(data.value);
    setLabel(data.label);
    close();
  }
  
  return (
    <div className={"select_box"} ref={ref}>
      <label className={'label'} onClick={toggleOpen}>{label}</label>
      <ul style={inlineUlStyle} className={'select_ul'}>
        {options.map((option, index) => (
          <li
            key={indexToKey(`selectBox-${id}`, index)}
            onClick={() => onChange(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SelectBox;