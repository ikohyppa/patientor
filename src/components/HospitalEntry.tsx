import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name='hospital' />
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
        <h3>discharged:</h3>
        <p>
          {entry.discharge.date}, {entry.discharge.criteria}
        </p>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntryDetails;
