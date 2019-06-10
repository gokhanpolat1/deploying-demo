var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Ayazma",
        image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ante metus dictum at tempor. Urna molestie at elementum eu facilisis sed odio morbi quis. Nunc aliquet bibendum enim facilisis gravida. Ac tincidunt vitae semper quis lectus nulla at. Tortor id aliquet lectus proin. Cursus eget nunc scelerisque viverra mauris in aliquam. Ultrices neque ornare aenean euismod elementum nisi. At risus viverra adipiscing at in tellus. Convallis convallis tellus id interdum velit laoreet. Neque gravida in fermentum et sollicitudin. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Odio tempor orci dapibus ultrices in iaculis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "Oludeniz",
        image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ante metus dictum at tempor. Urna molestie at elementum eu facilisis sed odio morbi quis. Nunc aliquet bibendum enim facilisis gravida. Ac tincidunt vitae semper quis lectus nulla at. Tortor id aliquet lectus proin. Cursus eget nunc scelerisque viverra mauris in aliquam. Ultrices neque ornare aenean euismod elementum nisi. At risus viverra adipiscing at in tellus. Convallis convallis tellus id interdum velit laoreet. Neque gravida in fermentum et sollicitudin. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Odio tempor orci dapibus ultrices in iaculis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "Olympos",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ante metus dictum at tempor. Urna molestie at elementum eu facilisis sed odio morbi quis. Nunc aliquet bibendum enim facilisis gravida. Ac tincidunt vitae semper quis lectus nulla at. Tortor id aliquet lectus proin. Cursus eget nunc scelerisque viverra mauris in aliquam. Ultrices neque ornare aenean euismod elementum nisi. At risus viverra adipiscing at in tellus. Convallis convallis tellus id interdum velit laoreet. Neque gravida in fermentum et sollicitudin. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Odio tempor orci dapibus ultrices in iaculis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "Marmaris",
        image: "https://farm9.staticflickr.com/8041/7930201874_6c17ed670a.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ante metus dictum at tempor. Urna molestie at elementum eu facilisis sed odio morbi quis. Nunc aliquet bibendum enim facilisis gravida. Ac tincidunt vitae semper quis lectus nulla at. Tortor id aliquet lectus proin. Cursus eget nunc scelerisque viverra mauris in aliquam. Ultrices neque ornare aenean euismod elementum nisi. At risus viverra adipiscing at in tellus. Convallis convallis tellus id interdum velit laoreet. Neque gravida in fermentum et sollicitudin. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Odio tempor orci dapibus ultrices in iaculis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    },
    {
        name: "Kabak Koyu",
        image: "https://farm9.staticflickr.com/8486/8240036928_1a31fbbe9e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ante metus dictum at tempor. Urna molestie at elementum eu facilisis sed odio morbi quis. Nunc aliquet bibendum enim facilisis gravida. Ac tincidunt vitae semper quis lectus nulla at. Tortor id aliquet lectus proin. Cursus eget nunc scelerisque viverra mauris in aliquam. Ultrices neque ornare aenean euismod elementum nisi. At risus viverra adipiscing at in tellus. Convallis convallis tellus id interdum velit laoreet. Neque gravida in fermentum et sollicitudin. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Odio tempor orci dapibus ultrices in iaculis. Imperdiet sed euismod nisi porta lorem mollis aliquam ut."
    }
]

function seedDB() {
    // remove all campgrounds
    Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds");
        }

        // add a few campgrounds
        // iceri yazdik cunku remove sonradan calissin istemiyoruz
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Added a campground");

                    //create a comment
                    Comment.create({
                        text: "This place is great",
                        author: "Gokhan"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;