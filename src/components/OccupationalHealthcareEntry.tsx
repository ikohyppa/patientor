import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name='stethoscope' /> {entry.employerName}
        </Card.Header>
        {entry.diagnosisCodes && (
          <>
            <h3>diagnoses:</h3>
            <List bulleted>
              {entry.diagnosisCodes.map(code => (
                <List.Item key={code}>
                  {code} {diagnoses[code].name}
                </List.Item>
              ))}
            </List>
          </>
        )}
        <h3>description:</h3>
        <p>{entry.description}</p>
        {entry.sickLeave && (
          <>
            <h3>sickleave:</h3>
            <p>
              {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </p>
          </>
        )}
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcareEntryDetails;
