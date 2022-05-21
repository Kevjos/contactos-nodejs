import mongoose from 'mongoose'

const {Schema} = mongoose

const conect = 'URL'
mongoose.connect(conect, {useNewUrlParser: true, useUnifiedTopology: true});

const contactoSchema = new Schema({
    nombre: String,
    numero: Number,
    direccion: String,
    email: String
})

const Contacto = mongoose.model('contactos', contactoSchema)

const agregarContacto = (req, res) => {

    const contacto = new Contacto({
        nombre: req.body.nombre,
        numero: Number(req.body.numero),
        direccion: req.body.direccion,
        email: req.body.email
    })
    contacto.save()
    .then(re => {
        res.redirect('/')
    })
    .catch(console.error)
}

const todosLosContactos = async(modelo) => {
    const resultados = await modelo.find({}, (err, docs) => {
        return docs
    })
    .clone().catch(function(err){ console.log(err)})
    //console.log(resultados)
    return resultados
}

const borrarContacto = (modelo, id, res) => {
    modelo.deleteOne({_id: id}, (err, doc) => {
        res.redirect('/')
    })
}

export {Contacto, agregarContacto, todosLosContactos, borrarContacto}