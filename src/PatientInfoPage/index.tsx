import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';

import { AddEntryModal } from '../AddEntryModal';
import EntryDetails from '../components/EntryDeatils';
import { Entry, EntryFormValues, Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { addEntry, updatePatientInfo, useStateValue } from '../state';

const PatientInfoPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const { id } = useParams<{ id: string }>();
  const patient = patients[id];

  //type EntryFormValues = Omit<Entry, 'id'>;

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 0 30px 0',
  };

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
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
            <EntryDetails entry={entry} />
          </React.Fragment>
        );
      })}
      <div style={buttonStyle}>
        <Button onClick={openModal}>Add new entry</Button>
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientInfoPage;
