import { useEffect, useState } from "react";
import useStore from "../store";

function EditContactForm() {
  const contactToEdit = useStore((state) => state.contactToEdit);

  console.log("Inside EditContactForm: ", contactToEdit);

  const contacts = useStore((state) => state.contacts);
  const setContacts = useStore((state) => state.setContacts);

  // [TODO] Write form handlers here and POST requests here...

  // Method One: Simple but tedious

  // Contact State
  const { firstName, lastName, blockContact } = useStore(
    (state) => state.contactInputs
  );
  const setContactInputs = useStore((state) => state.setContactInputs);

  // Address State
  const { street, city, postCode } = useStore((state) => state.addressInputs);
  const setAddressInputs = useStore((state) => state.setAddressInputs);

  console.log("EditContactForm State: ", {
    contact: {
      firstName,
      lastName,
      blockContact,
    },
    address: { street, city, postCode },
  });

  // useEffect keeps track of the changes in the component
  useEffect(() => {
    if (contactToEdit) {
      const { firstName, lastName, blockContact, address } = contactToEdit;

      const { street, city, postCode } = address;
      setContactInputs({ firstName: firstName });
      setContactInputs({ lastName: lastName });
      setContactInputs({ blockContact: blockContact });

      setAddressInputs({ street: street });
      setAddressInputs({ city: city });
      setAddressInputs({ postCode: postCode });
    }
  }, [contactToEdit]);

  // Form Handlers

  const handleSubmit = (event) => {
    event.preventDefault();

    const addressToEditId = contactToEdit.address.id;

    const addressToUpdate = {
      street,
      city,
      postCode,
    };

    const addressesFetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressToUpdate),
    };

    fetch(
      `http://localhost:3030/addresses/${addressToEditId}`,
      addressesFetchOptions
    )
      .then((res) => res.json())
      .then((updatedAddress) => {
        console.log("adresses PUT request: ", updatedAddress);

        const contactToUpdate = {
          firstName,
          lastName,
          blockContact,
          addressId: contactToEdit.addressId,
        };

        const contactsFetchOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactToUpdate),
        };

        fetch(
          `http://localhost:3030/contacts/${contactToEdit.id}`,
          contactsFetchOptions
        )
          .then((res) => res.json())
          .then((updatedContact) => {
            console.log("contacts PUT request: ", updatedContact);
          });
      });
  };

  const handleFirstName = (event) =>
    setContactInputs({ firstName: event.target.value });

  const handleLastName = (event) =>
    setContactInputs({ lastName: event.target.value });

  const handleBlockCheckbox = (event) =>
    setContactInputs({ blockContact: event.target.checked });

  const handleStreet = (event) =>
    setAddressInputs({ street: event.target.value });

  const handleCity = (event) => setAddressInputs({ city: event.target.value });

  const handlePostCode = (event) =>
    setAddressInputs({ postCode: event.target.value });

  return (
    <form
      onSubmit={handleSubmit}
      className="form-stack light-shadow center contact-form"
    >
      <h1>Edit Contact</h1>
      <label htmlFor="first-name-input">First Name:</label>
      <input
        id="first-name-input"
        name="first-name-input"
        type="text"
        onChange={handleFirstName}
        value={firstName}
      />
      <label htmlFor="last-name-input">Last Name:</label>
      <input
        id="last-name-input"
        name="last-name-input"
        type="text"
        onChange={handleLastName}
        value={lastName}
      />
      <label htmlFor="street-input">Street:</label>
      <input
        id="street-input"
        name="street-input"
        type="text"
        onChange={handleStreet}
        value={street}
      />
      <label htmlFor="city-input">City:</label>
      <input
        id="city-input"
        name="city-input"
        type="text"
        onChange={handleCity}
        value={city}
      />
      <label htmlFor="post-code-input">Post Code:</label>
      <input
        id="post-code-input"
        name="post-code-input"
        type="text"
        onChange={handlePostCode}
        value={postCode}
      />
      <div className="checkbox-section">
        <input
          id="block-checkbox"
          name="block-checkbox"
          type="checkbox"
          onChange={handleBlockCheckbox}
          checked={blockContact}
        />
        <label htmlFor="block-checkbox">Block</label>
      </div>
      <div className="actions-section">
        <button className="button blue" type="submit">
          Edit
        </button>
      </div>
    </form>
  );
}

export default EditContactForm;
