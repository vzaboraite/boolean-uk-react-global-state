import { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import EditContactForm from "./components/EditContactForm";
import "./styles.css";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [hideForm, setHideForm] = useState(true);

  // This is our intermediary, a place to hold the data during the transaction
  const [contactToEdit, setContactToEdit] = useState(null);

  console.log("App State: ", { contacts, hideForm, contactToEdit });

  // [TODO] Write a useEffect to fetch contacts here...

  useEffect(() => {
    fetch("http://localhost:3030/contacts")
      .then((res) => res.json())
      .then((contactsData) => setContacts(contactsData));
  }, []);

  return (
    <>
      {/* ContactsList is the component with the data we need; so we extract it using setState */}
      <ContactsList
        contacts={contacts}
        hideForm={hideForm}
        setHideForm={setHideForm}
        setContactToEdit={setContactToEdit}
      />
      <main>
        {!hideForm && (
          <CreateContactForm contacts={contacts} setContacts={setContacts} />
        )}
        {/* EditContactForm is the component we need to send the data to */}
        <EditContactForm
          contacts={contacts}
          setContacts={setContacts}
          contactToEdit={contactToEdit}
        />
      </main>
    </>
  );
}
