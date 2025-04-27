class App {
    constructor() {
        this.showCopyright();
        this.defaultHeaders = {
            'content-type': 'application/json'
        };
    }

    showCopyright = () => {
        const currentYear = new Date().getFullYear()
        document.querySelector('footer').innerHTML = `Copyright &copy; ${currentYear}`
    }

    getContacts = async () => {
        const res = await fetch(`/api/contacts/`);
        const data = await res.json();
        if (data.length === 0) {
            document.querySelector('#contacts-page-body').innerHTML = `
            <div class="no-item">
                No Contacts...
            </div>
            `;
        }
        else {
            let contactLstHtml = '';
            data.forEach(({ firstName, lastName, id, contact }) => {
                contactLstHtml += `
                <a href="../contacts/${id}">
                    <p>${firstName} ${lastName}</p>
                    <p>${contact}</p>
                </a>
            `
            });
            document.querySelector('#contacts-page-body').innerHTML = `
            <div id='contacts'>
                ${contactLstHtml}
            </div>
            `;
        }
    }

    saveContact = (contactId) => {
        const contactForm = document.querySelector('#contact-form');
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm)
            const url = contactId ? `/api/contacts/${contactId}/` : `/api/contacts/`;
            const res = await fetch(url, {
                method: contactId ? "PUT" : "POST",
                body: JSON.stringify({
                    'firstName': formData.get('firstName'),
                    'lastName': formData.get('lastName'),
                    'contact': formData.get('contact'),
                    'birthday': formData.get('birthday'),
                    'description': formData.get('description'),
                }),
                headers: this.defaultHeaders
            });
            const data = await res.json();
            if ([201, 202].includes(res.status)) {
                alert(contactId ? "Contact updated successfully." : "Contact saved successfully.");
                window.location.assign('/contacts');
            }
            else {
                alert(data['message'])
            }
        })
    }

    getContact = async (contactId) => {
        const res = await fetch(`/api/contacts/${contactId}`);
        const data = await res.json();
        if (res.status === 200) {
            const { firstName, lastName, birthday, contact, description } = data;
            document.querySelector('#contact-detail-body').innerHTML = `
                <div>
                    <div class="item-field">
                        <p>First Name</p>
                        <p>${firstName}</p>
                    </div>
                    <div class="item-field">
                        <p>Last Name</p>
                        <p>${lastName}</p>
                    </div>
                    <div class="item-field">
                        <p>Contact</p>
                        <p>${contact}</p>
                    </div>
                    <div class="item-field">
                        <p>Birthday</p>
                        <p>${birthday}</p>
                    </div>
                </div>
                <div class="item-field">
                    <p>Description</p>
                    <p>
                    ${description || 'N/A'}
                    </p>
                </div>
                <div>
                    <button class="btn-sm edit-btn" id="edit-contact">
                        Edit
                    </button>
                    <button class="btn-sm danger-btn" id="delete-contact">
                        Delete
                    </button>
                </div>
            `;
            // Edit
            document.querySelector('#edit-contact').onclick = () => window.location.assign(`/contact-form?id=${contactId}`)
            // Delete
            document.querySelector('#delete-contact').onclick = async () => {
                const confirmed = confirm("Are you sure you want to delete this contact?");
                if (confirmed) {
                    const res = await fetch(`/api/contacts/${contactId}/`, {
                        method: "DELETE",
                    })

                    if (res.status === 204) {
                        alert("Contact deleted successfully.");
                        window.location.replace('/contacts');
                    } else {
                        const data = await res.json();
                        alert(data['message']);
                    }
                }
            }
        }
        else {
            document.querySelector('#contact-detail-body').innerHTML = `
                <div class='no-item'>
                    No Contact Detail Found
                </div>
            `;
            alert(data['message']);
        }
    }

    getLogs = async () => {
        const res = await fetch('/api/logs');
        const data = await res.json();
        const body = document.querySelector('#contact-log-body');
        if (data.length == 0) {
            body.innerHTML = `
                <div class='no-item'>
                    No Logs Recorded
                </div>
            `;
        }
        else {
            let logsHtml = ''
            data.forEach(ele => {
                const { url, date, method } = ele;
                logsHtml += `
                    <tr>
                        <td>${url}</td>
                        <td style='text-align:center;'>
                            ${method}
                        </td>
                        <td style='text-align:center;'>
                            ${date}
                        </td>
                    </tr>
                ` ;
            })

            body.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <td>URL</td>
                            <td>Method</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${logsHtml}
                    </tbody>
                </table>
            `;
        }
    }
}

const app = new App()