import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon, List } from 'semantic-ui-react';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatientInfo } from '../state';

const PatientInfoPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatientInfo(patientInfoFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !patient.ssn) {
      fetchPatientInfo();
    }
  }, [id, dispatch, patient]);

  if (!patient || !patient.ssn) return null;

  const genderIcon = (gender: string) => {
    if (patient) {
      if (gender === 'male') return <Icon name='mars' />;
      if (gender === 'female') return <Icon name='venus' />;
      return <Icon name='genderless' />;
    }
  };

  return (
    <div className='App'>
      <h2>
        {patient.name}
        {genderIcon(patient.gender)}
      </h2>
      <p>{patient.ssn}</p>
      <p>{patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map(entry => {
        return (
          <React.Fragment key={entry.id}>
            <p>{`${entry.date}: ${entry.description}`}</p>
            {entry.diagnosisCodes && (
              <List bulleted>
                {entry.diagnosisCodes.map(code => (
                  <List.Item key={code}>{code}</List.Item>
                ))}
              </List>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PatientInfoPage;
