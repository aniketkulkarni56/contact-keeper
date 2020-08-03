const express = require('express')
const router = express.Router()

// @route GET api/contacts
// @desc  Get all contacts of logged in user
// @access Private
router.get('/',(req, res) => 
    res.send('Get all contacts...')
)

// @route POST api/contacts
// @desc  Add new contact
// @access Private
router.post('/',(req, res) => 
    res.send('Add contact...')
)

// @route PUT api/contacts/:id
// @desc  Update the contact
// @access Private
router.put('/:id',(req, res) => 
    res.send('Update contact ...')
)

// @route DELETE api/contacts/:id
// @desc  Delete the contact
// @access Private
router.delete('/:id',(req, res) => 
    res.send('Delete contact ...')
)

module.exports = router