import { useEffect } from "react";
import ContactsList from "./components/ContactsList";
import CreateContactForm from "./components/CreateContactForm";
import EditContactForm from "./components/EditContactForm";
import useStore from "./store";
import "./styles.css";

export default function App() {
  const hideForm = useStore((state) => state.hideForm);

  const getContacts = useStore((state) => state.getContacts);

  console.log("App State: ", { hideForm, getContacts });

  // [TODO] Write a useEffect to fetch contacts here...

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      {/* ContactsList is the component with the data we need; so we extract it using setState */}
      <ContactsList />
      <main>
        {!hideForm && <CreateContactForm />}
        {/* EditContactForm is the component we need to send the data to */}
        <EditContactForm />
      </main>
    </>
  );
}
