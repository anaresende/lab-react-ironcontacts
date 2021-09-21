import { useState } from 'react';
import contactsJson from '../contacts.json';

const firstContacts = contactsJson.slice(0,5)
let remainingContacts = contactsJson.slice(5)

function ContactRow(){
    const [contacts, setContacts] = useState(firstContacts)

    function handleDelete(contactId){
        const updatedContacts = contacts.filter((contact) => contact.id !== contactId)
        setContacts(updatedContacts)
    }
    
    const actorInfo = contacts.map((contact)=> 
        <tr key={contact.id}>
            <td>
                <img src={contact.pictureUrl} alt="actor" />
            </td>
            <td>
                {contact.name}
            </td>
            <td>
                {contact.popularity}
            </td>
            <td>
                {contact.wonOscar ? '🏆' : ''}
            </td>
            <td>
                {contact.wonEmmy ? '🏆' : ''}
            </td>
            <td>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </td>
        </tr>
    )

    function handleAddContact() {
        
        if (remainingContacts.length === 0) {
            return null
        }

        const randomIndex = Math.floor( Math.random() * remainingContacts.length )
        const aContact = remainingContacts[randomIndex]  
        
        
        remainingContacts.splice(randomIndex, 1)

        setContacts([...contacts, aContact])
    }

    function handleSortPopular() {
        let mostPopular = [...contacts].sort((a,b) => b.popularity - a.popularity)
        console.log(mostPopular)

        setContacts(mostPopular)
    }

    function handleSortName() {
        let orderedNames = [...contacts]
        orderedNames.sort((a,b)=>  a.name > b.name ? 1 : -1)
        console.log(orderedNames)
        setContacts(orderedNames)
    }


    return (
        <>
            <h1>IronContacts</h1>
            <button onClick={handleAddContact}>Add Random Contact</button>
            <button onClick={handleSortPopular}>Sort by popularity</button>
            <button onClick={handleSortName}>Sort by name</button>
            <table>
                <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Won Oscar</th>
                        <th>Won Emmy</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actorInfo}
                </tbody>
            </table>
        </>
    )
}

export default ContactRow;