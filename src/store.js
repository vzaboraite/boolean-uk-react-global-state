import create from "zustand";
import { devtools } from "zustand/middleware";

/* 
  Problem: doesn't work, getting error: `set` is not 
  defined when we have code like this: 
    const getContacts = () =>
      fetch("http://localhost:3030/contacts")
        .then((res) => res.json())
        .then((contactsData) =>
          set({
            contacts: contactsData,
          })
        );
*/
/* 
  Solution: use function currying. 
  If I understand correctly, in currying way getContacts 
  has set as parameter(which could be called other name) 
  and accepts another function with no parameters that does  
  the fetchrequest. Then we're setting getContacts to a 
  value of the getContacts(set)(which is a function with 
    an attribute of set, that we're getting from 
    create(set=>...) in useStore. 
    So when we're calling getContacts(set) inside useStore, 
    we're setting:
      getContacts: () =>
      fetch("http://localhost:3030/contacts")
      .then((res) => res.json())
      .then((contactsData) =>
        set({
          contacts: contactsData,
        })
      );

instead of `getContacts: getContacts(set) `
*/
const getContacts = (set) => () =>
  fetch("http://localhost:3030/contacts")
    .then((res) => res.json())
    .then((contactsData) =>
      set({
        contacts: contactsData,
      })
    );

const store = (set) => ({
  contacts: [],
  setContacts: (contactsData) =>
    set((state) => {
      console.log("Inside setContacts: ", { state, contactsData });
      return { contacts: contactsData };
    }),

  hideForm: true,
  setHideForm: (hideForm) =>
    set((state) => {
      console.log("Inside setHideForm: ", { state, hideForm });
      return { hideForm };
    }),

  getContacts: getContacts(set),

  contactToEdit: null,
  setContactToEdit: (contactToEditData) => {
    set((state) => {
      console.log("Inside setContactToEdit: ", { state, contactToEditData });
      return { contactToEdit: contactToEditData };
    });
  },

  contactInputs: {
    firstName: "",
    lastName: "",
    blockContact: false,
  },
  setContactInputs: (contactData) => {
    set((state) => {
      console.log("Inside setContactInputs: ", { state, contactData });
      return {
        contactInputs: {
          ...state.contactInputs,
          ...contactData,
        },
      };
    });
  },

  addressInputs: {
    street: "",
    city: "",
    postCode: "",
  },
  setAddressInputs: (addressData) => {
    set((state) => {
      console.log("Inside setAddressInputs: ", { state, addressData });
      return {
        addressInputs: {
          ...state.addressInputs,
          ...addressData,
        },
      };
    });
  },
});

const useStore = create(devtools(store));
export default useStore;
