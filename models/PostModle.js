var Post = require('../lib/mongo').Post;
var marked = require('marked')
module.exports = {
    //获取热门post
    getHotPosts: function getHotPosts (pageNo, pageSize) {
        return Post.find({})
                .limit(pageSize)
                .skip(pageSize * (pageNo -1) )
                .sort({'pv':-1})
                .populate({ path:'author', model:'User', select: {'name':1 ,_id:0}})
                .exec()
    },
    //获取cateId下的文章
    getCategoryPosts: function getCategoryPosts (cateId,pageNo, pageSize) {
        return Post.find({ cateId: cateId })
                .limit(pageSize)
                .skip(pageSize * (pageNo -1) )
                .sort({'_id': -1})
                .populate({ path:'author', model: 'User', select: {'name':1 ,_id:0}})
                .exec();
    },
    //获取用户所有post
    getPostsByAuthor: function getPostsByAuthor (id) {
        return Post.find({ author: id}).exec()
    },
    //生成一篇post
    createPost: function createPost (post) {
        post.content = marked(post.content)
        return Post.create(post);
    },
    //获取一篇post
    getPostById: function getPostById (postId) {
        return Post
        .find({_id: postId})
        .populate({ path: 'author', model: 'User', select: {'name':1,_id:0}})
        .exec();
    },
    incPv: function incPv (postId) {
        return Post
        .update({ _id: postId }, { $inc: {pv:1} })
        .exec()
    },
    incLike: function (postId) {
        return Post
            .update({_id: postId}, { $inc: {like: 1} })
            .exec()
    },
    decLike: function (postId) {
        return Post
            .update({_id: postId}, { $inc: {like: -1} })
            .exec()
    },
    incKeep: function (postId) {
        return Post
            .update({_id: postId}, { $inc: {keep: 1} })
            .exec()
    },
    decKeep: function (postId) {
        return Post
            .update({_id: postId}, { $inc: {keep: -1} })
            .exec()
    },
    //增加一条评论
    incComment: function (postId) {
        return Post
            .update({_id: postId}, { $inc: {comments: 1} })
            .exec()
    }
}