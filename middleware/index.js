var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                // object comparison'da == ve  === calismiyor
                if (foundCampground.author.id.equals(req.user._id)) {
                    // next'in anlami: dogrulamadan gectiysen cagrildigin yere git ve callback'in icindeki kodlari calistir
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        // user nereden geldiyse oraya geri gonder
        req.flash("error", "You are not allowed for this operation!!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentId, function (err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You are not allowed for this operation!!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    req.flash("error", "Please Login First!"); // flash mesaji redirect'ten once gonderilmeli
    res.redirect("/login")
};

module.exports = middlewareObj