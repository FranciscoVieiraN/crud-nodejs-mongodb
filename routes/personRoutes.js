const router = require('express').Router()

const Person = require('../models/Person')

// Create
router.post('/', async (req, res) => {

    //req.body
    //{name: "Matheus", salary: 5000, aprroved: false}
    const {name, salary, approved} = req.body

    if(!name) {
        res.status(422).json({ error: 'Name is required!' })
        return
    }

    const person = {
        name,
        salary,
        approved
    }

    try {

        await Person.create(person)

        res.status(201).json({ message: 'Successfully registered person!' })

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Find
router.get('/', async (req, res) =>{

    try {

        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Find by ID
router.get('/:id', async (req, res) =>{

    const id = req.params.id

    try {

        const person = await Person.findOne({ _id: id })

        if(!person) {
            res.status(404).json({ message: 'Person not found!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Update
router.patch('/:id', async (req, res) =>{

    const id = req.params.id
    const {name, salary, approved} = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(404).json({ message: 'Person not found!' })
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }
})


//Delete
router.delete('/:id', async (req, res) =>{

    const id = req.params.id
    const person = await Person.findOne({ _id: id })

    if(!person) {
        res.status(404).json({ message: 'Person not found!' })
        return
    }

    try {
        await Person.deleteOne({ _id: id })
        
        res.status(200).json({ messege: 'Person removed successfully!' })
    } catch (error) {
        res.status(500).json({error: error})
    }
})



module.exports = router
