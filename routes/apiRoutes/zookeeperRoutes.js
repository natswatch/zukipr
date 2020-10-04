const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');
const router = require('express').Router();

// get and post requests
router.get('/zookeepers', (req,res) =>{
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
    res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    //validate data in req.bodyå
    if (!validateZookeeper(req.body)) {
        // 400 is s user error not server
        res.status(400).send('The zookeeper is not properly formatted.');
    } else {
    // add animal to json file and animals array in this function
    const zookeeper = createNewZookeeperl(req.body, zookeepers);
    res.json(zookeeper);
    }
});

module.exports = router;