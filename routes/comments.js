var express = require("express");
var router = express.Router({mergeParams: true}); // merge params sayesinde :id' ye ulasabiliyoruz
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// post'ta isLoggedIn user interface acisindan gerekli olmasa da postman gibi app'ler araciligiyla post atmaktan korunmak icin gereklidir
router.post("/", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    // save filled comment
                    comment.save();

                    // push comment to campground and save campground
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully created comment!");
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
        }
    });
});

// EDIT COMMENT ROUTE
router.get("/:commentId/edit", middleware.checkCommentOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            Comment.findById(req.params.commentId, function (err, foundComment) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("comments/edit", {campground: foundCampground, comment: foundComment});
                }
            });
        }
    });
});

// UPDATE COMMENT ROUTE
router.put("/:commentId", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function (err, updatedComment) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id); // veya res.redirect("back")
        } else {
            req.flash("success", "Successfully edited comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DELETE COMMENT ROUTE
router.delete("/:commentId", middleware.checkCommentOwnership, function (req, res) {
    Comment.findByIdAndRemove(req.params.commentId, function (err, removedCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            req.flash("success", "Successfully removed comment!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;