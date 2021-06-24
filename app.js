//Load JS modu
const express = require('express');
const port = 3000;
const app = express();

const engine = require('ejs-mate');

const path = require('path');

const mongoose = require('mongoose');

const methodOverride = require('method-override');

//Require our campground model
const Campground = require('./models/campground');
const { title } = require('process');

app.engine('ejs', engine);

//Allows us to use static template files in application
app.set('view engine', 'ejs');

//Directory wherere static template files are located 
app.set('views', __dirname + '/views')

//Parse body by default
app.use(express.urlencoded({ extended: true }))

app.use(methodOverride('_method'));

//Establish and check mongodb connection
mongoose.connect('mongodb+srv://robroskie:Snuggles69@cluster0.jh58z.mongodb.net/yelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
});


app.get('/test', (req, res) => {
    res.render('home.ejs')
});

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'cheap camping!' });
    await camp.save()
        .then((result) => {
            console.log('success');
            res.send(result);
        })
        .catch((error) => {
            console.log(err);
            res.send(400, "Bad Request");
        })
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
});

app.put('/campgrounds/:id', async (req, res) => {
    //find and update
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(
        id,
        { ...req.body.campground });

    res.redirect(`/campgrounds/${campground.id}`);
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
});

app.post('/campgrounds', async (req, res) => {
    const new_campground = new Campground(req.body.campground);
    await new_campground.save();
    res.redirect(`/campgrounds/${new_campground.id}`)
});


app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

app.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});