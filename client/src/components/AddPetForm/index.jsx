import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

// import { createUser } from '../utils/API';
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../../utils/mutations.js';
// import { ADD_USER } from '../../utils/mutations.js';
import Auth from '../../utils/auth.js';

const AddPetForm = () => {
  // set initial form state
  const [petFormData, setPetFormData] = useState({ name: '', species: '', color: '', age: '', gender: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  //   const [addUser, { error, data }] = useMutation(ADD_USER);
  const [createPet, { error }] = useMutation(ADD_PET);
  console.log(19, error);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetFormData({ ...petFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createPet({ variables: { ...petFormData } });
      // await createPet({ variables: { ...petFormData } });

      if (!data) {
        throw new Error('No pet information added!');
      }

      console.log(data);

      const { token, user } = await data.createPet;
      console.log(user);
      Auth.login(token);

      setPetFormData({
        name: '',
        species: '',
        color: '',
        age: '',
        gender: ''
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='name'>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Pet Name'
            name='name'
            onChange={handleInputChange}
            value={petFormData.name}
            required
          />
          <Form.Control.Feedback type='invalid'>Pet name is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='species'>Species</Form.Label>
          <Form.Control
            type='text'
            placeholder='Species'
            name='species'
            onChange={handleInputChange}
            value={petFormData.species}
            required
          />
          <Form.Control.Feedback type='invalid'>Species is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='color'>Color</Form.Label>
          <Form.Control
            type='text'
            placeholder='Color'
            name='color'
            onChange={handleInputChange}
            value={petFormData.color}
            required
          />
          <Form.Control.Feedback type='invalid'>Color is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='age'>Age (Months)</Form.Label>
          <Form.Control
            type='text'
            placeholder='Age'
            name='age'
            onChange={handleInputChange}
            value={petFormData.age}
            required
          />
          <Form.Control.Feedback type='invalid'>Age is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='gender'>Gender</Form.Label>
          <Form.Control
            type='text'
            placeholder='Gender'
            name='gender'
            onChange={handleInputChange}
            value={petFormData.gender}
            required
          />
          <Form.Control.Feedback type='invalid'>Gender is required!</Form.Control.Feedback>
        </Form.Group>


        <Button
          disabled={!(petFormData.name && petFormData.species && petFormData.color && petFormData.gender && petFormData.age)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AddPetForm;