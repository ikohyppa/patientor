import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import { Type } from '../types';

// structure of a single option
export type TypeOption = {
  value: Type;
  label: string;
};

// props for select field component
type SelectTypeProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectType: React.FC<SelectTypeProps> = ({
  name,
  label,
  options,
}: SelectTypeProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);
