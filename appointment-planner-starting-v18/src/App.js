import React, {useState, useEffect} from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/Root";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {

  const [contacts, setContacts] = useState([])
  const [appointments, setAppointments] = useState([])  

  function addNewContact(name, phone, email){

    const newContact = {
      name,
      description: [phone,email]
    }

    setContacts(prevContacts => [newContact, ...prevContacts])
  }

  function addNewAppointment(name, contact, date, time){
    
    const newAppointment = {
      name,
      description: [contact, date, time]
    }

    setAppointments(prevAppointment => [newAppointment, ...prevAppointment])
  }


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <Navigate to={ROUTES.CONTACTS} replace/> }/>
      <Route path={ROUTES.CONTACTS} element={ 
        <ContactsPage 
          contacts={contacts} 
          addNewContact={addNewContact}
        />}
      />
      <Route path={ROUTES.APPOINTMENTS} element={ 
        <AppointmentsPage  
          contacts={contacts}
          appointments={appointments} 
          addNewAppointment={addNewAppointment}
        />}
      />
    </Route>
  ));
  
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
