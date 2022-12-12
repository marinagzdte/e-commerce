import { sendMail } from "./nodeMailerUtils.js"

const newMail = (to = process.env.ADMIN_EMAIL) => {
    return {
        from: 'e-commerce',
        to: to,
        subject: null,
        html: null
    }
}

const sendNewUserEmail = async (user) => {
    const options = newMail();
    options.subject = 'Nuevo usuario registrado'
    options.html = `<h1 style="color: blue;">Datos del usuario:</h1>
                    <ul>
                        <li>Nombre: ${user.firstName} ${user.lastName}</li>
                        <li>Dirección: ${user.address}</li>
                        <li>Número de teléfono: ${user.phoneNumber}</li>
                        <li>Dirección de correo electrónico: ${user.email}</li>
                    </ul>`
    await sendMail(options)
}

const writeProdList = (prods) => {
    let list = "<ul>"
    prods.forEach(p => {
        list += `<li>${p.description} x ${p.amount} ${p.amount === 1 ? "unidad" : "unidades"} ($${p.price} c/u)</li>`
    });
    list += "</ul>"
    return list
}

const sendNewOrderEmail = async (order) => {
    const options = newMail();
    options.subject = `Nuevo pedido del usuario ${order.email}`
    options.html = `<h1 style="color: blue;">Detalle de la orden #${order.number}</h1>
                    ${writeProdList(order.items)}
                    <h1 style="color: blue;">Datos del usuario:</h1>
                    <ul>
                        <li>Número de teléfono: ${order.phoneNumber}</li>
                        <li>Dirección de envío: ${order.address}</li>
                    </ul>`
    await sendMail(options)
}

export { sendNewUserEmail, sendNewOrderEmail }