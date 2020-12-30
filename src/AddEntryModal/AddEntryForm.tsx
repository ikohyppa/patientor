import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from '../AddPatientModal/FormField';
import { SelectType, TypeOption } from './TypeSelector';
import { EntryFormValues, Type } from '../types';
import { useStateValue } from '../state';
import * as Validator from './validators';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.Hospital, label: Type.Hospital },
  { value: Type.OccupationalHealthcare, label: Type.OccupationalHealthcare },
  { value: Type.HealthCheck, label: Type.HealthCheck },
];

export const EntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: '',
        },
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <SelectType label='Type *' name='type' options={typeOptions} />
            <Field
              label='Description *'
              placeholder='Description'
              name='description'
              component={TextField}
              validate={Validator.required}
            />
            <Field
              label='Date *'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
              validate={Validator.dateRequired}
            />
            <Field
              label='Specialist *'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
              validate={Validator.required}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === Type.Hospital && (
              <>
                <Field
                  label='Discharge date *'
                  placeholder='YYYY-MM-DD'
                  name='discharge.date'
                  component={TextField}
                  validate={Validator.dateRequired}
                />
                <Field
                  label='Discharge criteria *'
                  placeholder='Criteria'
                  name='discharge.criteria'
                  component={TextField}
                  validate={Validator.required}
                />
              </>
            )}
            {values.type === Type.OccupationalHealthcare && (
              <>
                <Field
                  label='Employer name *'
                  placeholder='Employer name'
                  name='employerName'
                  component={TextField}
                  validate={Validator.required}
                />
                <Field
                  label='Sickleave start date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                  component={TextField}
                  validate={Validator.date}
                />
                <Field
                  label='Sickleave end date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.endDate'
                  component={TextField}
                  validate={Validator.date}
                />
              </>
            )}
            {values.type === Type.HealthCheck && (
              <Field
                label='Health check rating'
                name='healthCheckRating'
                component={NumberField}
                min={0}
                max={3}
                validate={Validator.requiredWithZero}
              />
            )}
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
