const Settings = require("../models/settings");
const Contacts = require("../models/contacts");
const { sendTelegramMessage } = require("../services/telegram");
const Projects = require("../models/projects");
const Posts = require("../models/posts");
const Certificas = require("../models/certificas");

exports.getIndex = async (req, res, next) => {
  try {
    const settings = await Settings.findOne();

    const projects = await Projects.findAll({
    });
    const certificas = await Certificas.findAll({});

    const posts = await Posts.findAll({

    });

    res.render("user/index", {
      title: "Ana Sayfa",
      path: "/",
      settings: settings || {},
      projects: projects || [],
      posts: posts || [],
      certificas : certificas || [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred.");
  }
};





exports.postIndex = (req, res, next) => {
  const { name, email, subject, message } = req.body;

  Contacts.create({ name, email, subject, message })
    .then(() => {
      const text = `
        📩 Yeni İletişim Mesajı

        👤 Ad: ${name}
        📧 Email: ${email}
        📝 Konu: ${subject}
        💬 Mesaj: ${message}
        `;

      sendTelegramMessage(text);

      res.redirect('/');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Bir hata oluştu.');
    });
};




exports.getRestorePage = (req, res, next) => {
  res.render("user/restore_page")
}

exports.getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const targetPost = await Posts.findByPk(id);
    if (!targetPost) {
      return res.status(404).send("Yazı bulunamadı.");
    }

    const post = targetPost.get({ plain: true });

    const settings = await Settings.findOne();

    res.render("user/blog", {
      title: post.title + " | Baran Çelik",
      path: `/blog/${post.id}`,
      posts : post,
      settings
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Bir hata oluştu.");
  }
};


exports.postBlog = async (req, res, next) => {
/*  const { postId, comment, like } = req.body;

  try {
    // Yorum ekleme
    if (comment) {
      // Varsayalım ki Comments modeli var
      await Comments.create({
        postId,
        comment,
        user: req.user ? req.user.id : null // kullanıcı oturumu varsa
      });
    }

    // Beğeni ekleme
    if (like) {
      // Varsayalım ki Likes modeli var
      await Likes.create({
        postId,
        user: req.user ? req.user.id : null
      });
    }

    res.redirect('/blog');
  } catch (err) {
    console.error(err);
    res.status(500).send('Bir hata oluştu.');
  }*/
};