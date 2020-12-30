import moment from 'moment';

export const required = (value: string) => {
  let error;
  if (!value) {
    error = 'Field is required';
    return error;
  }
};

export const requiredWithZero = (value: number) => {
  let error;
  if (value !== 0 && !value) {
    error = 'Field is required';
    return error;
  }
};

export const dateRequired = (value: string) => {
  let error;
  if (!value) {
    error = 'Field is required';
    return error;
  }
  if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
    error = 'Corrert date format is YYYY-MM-DD';
    return error;
  }
};

export const date = (value: string) => {
  let error;
  if (value && !moment(value, 'YYYY-MM-DD', true).isValid()) {
    error = 'Corrert date format is YYYY-MM-DD';
    return error;
  }
};
