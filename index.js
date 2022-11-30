const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bodyParser = require('body-parser');

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(resolve => {console.log('connected')})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let User = mongoose.model("User", new Schema({
  username: String
}));

let Exercise = mongoose.model("Exercise", new Schema({
  userId: String,
  description: String,
  duration: Number,
  date: Date
}))


app.post('/api/users/', function(req, res){
  if (req.body.username === '') {
		return res.json({ error: 'username is required' });
	}

  var username = req.body.username
  User.findOne({username: username}, function(err, data){
    if(!err && data === null){
      var user = new User({username: username})
      user.save(function(err, data){
        if(!err) return res.json({_id: _id, username: username})
      })
    }else{
      return res.json({error: "username already exist!!!"})
    }
  })
})

app.get('/api/users', function (req, res) {
	User.find({}, function (err, data) {
		if (!err) {
			return res.json(data);
		}
	});
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
