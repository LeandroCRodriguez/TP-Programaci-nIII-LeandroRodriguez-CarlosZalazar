const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => 
    {
        res.send('GET experiencias')
    });

router.get('/:id',  (req, res) => 
    {
        res.send('GET experiencias por ID')
    });

    router.post('/',  (req, res) => 
    {
        res.send('POST experiencias')
    });

    router.put('/',  (req, res) =>
    {
        res.send('PUT experiencias')
    });

router.delete('/',  (req, res) =>
{
    res.send('DELETE experiencias')
});



module.exports = router; 