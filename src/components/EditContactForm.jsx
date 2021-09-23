import { useEffect, useState } from "react";

function EditContactForm(props) {
  const { contacts, setContacts, contactToEdit } = props;

  console.log("Inside EditContactForm: ", contactToEdit);

  // [TODO] Write form handlers here and POST requests here...

  // Method One: Simple but tedious

  // Contact State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [blockContact, setBlockContact] = useState(false);

  // Address State
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");

  console.log("EditContactForm State: ", {
    contact: {
      firstName,
      lastName,
      blockContact
    },
    address: { street, city, postCode }
  });

  // useEffect keeps track of the changes in the component
  useEffect(() => {
    if (contactToEdit) {
      const { firstName, lastName, blockContact, address } = contactToEdit;

      const { street, city, postCode } = address;
      setFirstName(firstName);
      setLastName(lastName);
      setBlockContact(blockContact);
      setStreet(street);
      setCity(city);
      setPostCode(postCode);
    }
  }, [contactToEdit]);

  // Form Handlers

  const handleSubmit = (event) => {
    event.preventDefault();

    const addressToEditId = contactToEdit.address.id;

    const addressToUpdate = {
      street,
      city,
      postCode
    };

    const addressesFetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addressToUpdate)
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
          addressId: contactToEdit.addressId
        };

        const contactsFetchOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactToUpdate)
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

  const handleFirstName = (event) => setFirstName(event.target.value);

  const handleLastName = (event) => setLastName(event.target.value);

  const handleBlockCheckbox = (event) => setBlockContact(event.target.checked);

  const handleStreet = (event) => setStreet(event.target.value);

  const handleCity = (event) => setCity(event.target.value);

  const handlePostCode = (event) => setPostCode(event.target.value);

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
