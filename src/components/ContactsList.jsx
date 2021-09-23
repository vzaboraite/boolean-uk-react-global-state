function ContactsList(props) {
  const { contacts, hideForm, setHideForm, setContactToEdit } = props;

  return (
    <aside className="contacts-section light-shadow">
      <header>
        <h2>Contacts</h2>
        <button
          onClick={() => setHideForm(!hideForm)}
          className="button new-contact-btn"
        >
          {hideForm ? "Create" : "Cancel"}
        </button>
      </header>
      <ul>
        {contacts.map((contact, index) => {
          // const firstName = contact.firstName
          // const lastName = contact.lastName

          const { firstName, lastName, address } = contact;

          // const street = address.street
          // const postCode = address.postCode

          const { street, postCode } = address;

          return (
            <li key={index}>
              <h3>
                {firstName} {lastName}
              </h3>
              <p>
                {street}, {postCode}
              </p>
              <button onClick={() => setContactToEdit(contact)}>Edit</button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default ContactsList;
