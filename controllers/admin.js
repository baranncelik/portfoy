const Settings = require("../models/settings");
const Contacts = require("../models/contacts");
const Projects = require("../models/projects");
const Posts = require('../models/posts');
const Certificas = require("../models/certificas");

exports.getSettings = (req, res, next) => {
  Settings.findOne()
    .then(setting => {
      res.render("admin/settings", {
        title: "Admin Panel",
        path: "/settings",
        isAuthenticated: req.session.isAuthenticated,
        setting 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Bir hata oluştu");
    });
};




exports.postSettings = (req, res, next) => {
  const { about, ability, age, address, mail, tel } = req.body;

  Settings.findOne()
    .then((setting) => {
      if (setting) {
        return Settings.update(
          {
            age: age || setting.age,
            mail: mail || setting.mail,
            tel: tel || setting.tel,
            about : about || setting.about,
            address : address || setting.address,
            ability : ability || setting.ability,
            profile_photo: req.files["profile_photo"]
              ? "/media/" + req.files["profile_photo"][0].filename
              : setting.profile_photo,
              cv: req.files["cv"]
              ? "/media/" + req.files["cv"][0].filename
              : setting.cv
          },{ where: { id: setting.id } }
        );
      } else {
        return Settings.create({
            age: age || "",
            mail : mail || "",
            tel : tel || "",
            about : about || "",
            address : address || "",
            ability : ability || "",
            profile_photo: req.files["profile_photo"]
              ? "/media/" + req.files["profile_photo"][0].filename
              : null,
            cv: req.files["cv"]
              ? "/media/" + req.files["cv"][0].filename
              : null,
        });
      }
    })
    .then(() => {
      res.redirect("/admin/settings");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Bir hata oluştu.");
    });
};




exports.getMessages = async (req,res,next) =>{
try{
const contacts = await Contacts.findAll();
    res.render("admin/messages",{
        title : "Mesajlar",
        path : "/messages",
        contacts,
        isAuthenticated : req.session.isAuthenticated
    });
    }
catch(error){
    console.log(error);
    res.status(500).send("Bir hata oluştu");

}

};
    



exports.postMessages = (req,res,next) =>{

const action = req.body.action;

if(!action){
    return res.redirect("/admin/messages");
}

const [type,id] = action.split("_");

if(type == "read"){
    Contacts.findByPk(id)
        .then((message)=>{
            return message.update({ read : true })
        })
        .then(()=>{
            res.redirect("/admin/messages");
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send("Bir hata oluştu.");
        });
}
else{  //type == delete

    Contacts.findByPk(id)
        .then(message =>{
            return message.destroy();
        })
        .then(()=>{
            res.redirect("/admin/messages");
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send("Bir hata oluştu.");
        });

};


};


exports.getAddProject = (req,res,next) =>{
Projects.findAll()
.then(project =>{
    res.render("admin/add-project",{
      title : "Add-Project",
      project : project || {},
      isAuthenticated: req.session.isAuthenticated

    })
})
.catch(err =>{
  console.log(err);
})

};


exports.postAddProject = (req, res, next) => {
  const { project_title, project_description, link, repo_link, project_id } = req.body;

  if (project_id) {
    Projects.findByPk(project_id)
      .then(project => {
        if (!project) {
          return res.status(404).send("Proje bulunamadı.");
        }
        return project.update({
          project_title: project_title || project.project_title,
          project_description: project_description || project.project_description,
          link: link || project.link,
          repo_link: repo_link || project.repo_link,
          img_url: req.files["img_url"]
            ? "/media/" + req.files["img_url"][0].filename
            : project.img_url,
        });
      })
      .then(() => {
        res.redirect("/admin/add-project");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Bir hata oluştu.");
      });
  } else {
    Projects.create({
      project_title: project_title || "",
      project_description: project_description || "",
      link: link || "",
      repo_link: repo_link || "",
      img_url: req.files["img_url"] ? "/media/" + req.files["img_url"][0].filename : null,
    })
      .then(() => {
        res.redirect("/admin/add-project");
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Bir hata oluştu.");
      });
  }
};





exports.getShowProjects = async (req, res, next) => {
  try {
    const projects = await Projects.findAll();
    res.render("admin/show-projects", {
      title: "Tüm Projeler",
      projects: projects || [],
      isAuthenticated: req.session.isAuthenticated
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};

exports.getEditProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await Projects.findByPk(projectId);
    if (!project) {
      return res.status(404).send("Proje bulunamadı.");
    }
    res.render("admin/edit-project", {
      title: "Projeyi Düzenle",
      project,
      isAuthenticated: req.session.isAuthenticated
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};

exports.postEditProject = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const { project_title, project_description, link, repo_link } = req.body;
    const imageFile = req.files && req.files['img_url'] && req.files['img_url'][0];
    const img_url = imageFile ? '/media/' + imageFile.filename : null;

    const project = await Projects.findByPk(projectId);
    if (!project) {
      return res.status(404).send("Proje bulunamadı.");
    }

    await project.update({
      project_title: project_title || project.project_title,
      project_description: project_description || project.project_description,
      link: link || project.link,
      repo_link: repo_link || project.repo_link,
      img_url: img_url || project.img_url
    });

    res.redirect("/admin/show-projects");
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};



exports.getAddPost = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.render('admin/add-posts', {
      title: 'Yeni Gönderi Ekle',
      posts: posts || [],
      isAuthenticated: req.session.isAuthenticated
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};

exports.postAddPost = async (req, res, next) => {
  try {
    const { post_id, title, summary, content, createdAd} = req.body;
    const published = req.body.published === '1' ? 1 : 0;

    const imageFile = req.files && req.files['image_url'] && req.files['image_url'][0];
    const image_url = imageFile ? '/media/' + imageFile.filename : null; 

    if (post_id) {
      const post = await Posts.findByPk(post_id);
      if (!post) {
      return res.status(404).send("Gönderi bulunamadı.");
      }
      await post.update({
      title: title || post.title,
      summary: summary || post.summary,
      content: content || post.content,
      image_url: image_url || post.image_url,
      published,
      createdAd: createdAd || post.createdAd
      });
    } else {
      await Posts.create({
      title: title || '',
      summary: summary || '',
      content: content || '',
      image_url,
      published,      
      createdAd: createdAd || null
      });
    }
    
    
      res.redirect("/admin/add-posts");

  } 
  catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};

exports.getShowPosts = async (req, res, next) => {
  try {
    const posts = await Posts.findAll();
    res.render("admin/show-posts", {
      title: "Tüm Gönderiler",
      posts: posts || [],
      isAuthenticated: req.session.isAuthenticated
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};


exports.getEditPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Posts.findByPk(postId);
    if (!post) {
      return res.status(404).send("Gönderi bulunamadı.");
    }
    res.render("admin/edit-post", {
      title: "Gönderiyi Düzenle",
      post,
      isAuthenticated: req.session.isAuthenticated
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};

exports.postEditPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { 
      title, 
      summary, 
      content, 
      createdAd,
      content_fikir,
      content_teknolojiler,
      content_mantik,
      content_zorluklar,
      content_ogrendim,
      content_sonuc
    } = req.body;
    const published = req.body.published === 'true' ? 1 : 0;

    const imageFile = req.files && req.files['image_url'] && req.files['image_url'][0];
    const image_url = imageFile ? '/media/' + imageFile.filename : null;

    const post = await Posts.findByPk(postId);
    if (!post) {
      return res.status(404).send("Gönderi bulunamadı.");
    }

    await post.update({
      title: title || post.title,
      summary: summary || post.summary,
      content: content || post.content,
      image_url: image_url || post.image_url,
      published,
      createdAd: createdAd || post.createdAd,
      content_fikir: content_fikir || post.content_fikir,
      content_teknolojiler: content_teknolojiler || post.content_teknolojiler,
      content_mantik: content_mantik || post.content_mantik,
      content_zorluklar: content_zorluklar || post.content_zorluklar,
      content_ogrendim: content_ogrendim || post.content_ogrendim,
      content_sonuc: content_sonuc || post.content_sonuc
    });

    res.redirect("/admin/show-posts");
  } catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
};











exports.getAddCertifica = async (req, res, next) => {
  try{
    const certificas = await Certificas.findAll()
      res.render("admin/add-certifica",{
        title : "Certificas",
        certificas : certificas || [],
        isAuthenticated : req.session.isAuthenticated
      })

  }
  catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  }
  
};

exports.postAddCertifica = async (req, res, next) => {
  try{
  const { title, description } = req.body;

  await Certificas.create({
    title,
    description,
    pdf : req.files["pdf"] ? "/media/" + req.files["pdf"][0].filename : null
  })
  res.redirect("/admin/add-certifica");
}
  catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  };
};




exports.getShowCertificas = async (req, res, next) => {
  try{
  const certificas = await Certificas.findAll();
  res.render("admin/show-certificas",{
    title : "Show Certifica",
    certificas : certificas || [],
        isAuthenticated : req.session.isAuthenticated

  })
}  catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  };
};



exports.getEditCertifica = async (req, res, next) => {
try{
const certificaID = req.params.id;
const certifica = await Certificas.findByPk(certificaID);
res.render("admin/edit-certifica",{
  title : "Sertifikayı Düzenle",
  certifica : certifica || [],
        isAuthenticated : req.session.isAuthenticated

})
}
catch (err) {
  res.status(500).send("Bir hata oluştu.");
} 

};




exports.postEditCertifica = async (req, res, next) => {
  try{
 const certificaID = req.params.id;
 const { title, description } = req.body;
const certifica = await Certificas.findByPk(certificaID);
if (!certifica) return res.status(404).send("Sertifika bulunamadı.")

  await certifica.update({
    title : title || certifica.title,
    description : description || certifica.description,
    pdf : req.files["pdf"] ? "/media/" + req.files["pdf"][0].filename : certifica.pdf
  })
  res.redirect("/admin/show-certificas")

}
catch (err) {
    console.log(err);
    res.status(500).send("Bir hata oluştu.");
  };
};


exports.postDeleteProject = async (req,res,next) =>{
  try{
const id = req.params.id;
await Projects.destroy({where : {id : id}});
res.redirect("/admin/show-projects")
  }
  catch(err){
    console.log(err);
  }
};

exports.postDeletePost = async (req,res,next) =>{
  try{
const id = req.params.id;
await Posts.destroy({where : {id : id}});
res.redirect("/admin/show-posts")
  }
  catch(err){
    console.log(err);
};
};

exports.postDeleteCertifica = async (req,res,next) =>{
  try{
const id = req.params.id;
await Certificas.destroy({where : {id : id}});
res.redirect("/admin/show-certificas")
  }
  catch(err){
    console.log(err);
};
};