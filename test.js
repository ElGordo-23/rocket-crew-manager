import { useState } from 'react';
import { useMutation } from 'react-query';

const addUser = ({ userName, rocketName }) => {
  const mutation = useMutation(
    User,
    gql`
      mutation User($name: String!, $rocket: String!) {
        insert_users(objects: { name: $name, rocket: $rocket }) {
          returning {
            name
            rocket
          }
        }
      }
    `,
  );

  const variables = {
    name: userName,
    rocket: rocketName,
  };
  const data = graphqlClient.request(mutation, variables);

  console.log(JSON.stringify(data));
};

const AddUser = () => {
  const [userName, setUsername] = useState('');

  const onAddUser = async (e) => {
    e.preventDefault();

    try {
      await mutate({ userName });
    } catch (error) {}
  };
};
