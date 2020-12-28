import React from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { HealthCheckEntry } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  const [{ diagnoses }] = useStateValue();

  const healthColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return undefined;
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name='doctor' />
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
        <h3>healt rating:</h3>
        <p>
          <Icon name='heart' color={healthColor()} />
        </p>
      </Card.Content>
    </Card>
  );
};

export default HealthCheckEntryDetails;
