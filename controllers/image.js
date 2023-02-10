const Clarifai = require('clarifai');


//Add your own Clarifai API KEY below here 
const app = new Clarifai.App({
    apiKey: '1c750faf49274fe5a5ef4fcd0603653c'
});


const handleApiCall = (req, res) => {
    // app.models
    //     .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    //     .then(data => {
    //         res.json(data);
    //     })
    //     .catch(err => res.status(400).json('unable to work with API'))
    app.models
    .predict(
      {
        id: 'face-detection',
        name: 'face-detection',
        version: '6dc7e46bc9124c5c8824be4822abe105',
        type: 'visual-detector',
      }, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

// '53e1df302c079b3db8a0a36033ed2d15',

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            // console.log(entries[0]);
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}