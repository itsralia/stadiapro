const Comment = require("../models/Comment")

module.exports = {
    
    createComment:async (req, res) => {
      try {
        // Upload image to cloudinary
        const comments= await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
  
  
        await Comment.create({
          comment: req.body.comment,
          likes: 0,
          post: req.params.id,
        });
        console.log("Comment has been added!");
        res.redirect("/post/"+ req.params.id);
      } catch (err) {
        console.log(err);
      }
    },
}