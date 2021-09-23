import { useState } from "react";

function CreateContactForm(props) {
  const { contacts, setContacts } = props;

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

  console.log("CreateContactForm State: ", {
    contact: {
      firstName,
      lastName,
      blockContact
    },
    address: { street, city, postCode }
  });

  // Form Handlers

  const handleSubmit = (event) => {
    event.preventDefault();

    const addressToCreate = {
      street,
      city,
      postCode
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(addressToCreate)
    };

    fetch("http://localhost:3030/addresses", fetchOptions)
      .then((res) => res.json())
      .then((newAddress) => {
        console.log("addresses POST request: ", newAddress);

        const contactToCreate = {
          firstName,
          lastName,
          blockContact,
          addressId: newAddress.id
        };

        console.log("contact to create: ", contactToCreate);

        // Ready to write our next post request in here...

        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactToCreate)
        };

        fetch("http://localhost:3030/contacts", fetchOptions)
          .then((res) => res.json())
          .then((newContact) => {
            console.log("contacts POST request: ", newContact);
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
      <h1>Create Contact</h1>
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
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateContactForm;
