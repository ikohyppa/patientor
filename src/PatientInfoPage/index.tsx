import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';

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
    if (patient && !patients[id].ssn) {
      fetchPatientInfo();
    }
  }, [id, dispatch, patients]);

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
    </div>
  );
};

export default PatientInfoPage;
