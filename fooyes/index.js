var express = require('express');
 //const bodyParser = require('body-parser');
 var app = express();
 var ratingsinfo;
 var path=require('path')
app.path = require('path');
//  const Users = require('/index.js');
 app.use(express.static(path.join(__dirname, '/Admin/admin_section')));
 app.use(express.static(path.join(__dirname, '/manager/manager_section')));
 app.use(express.static(path.join(__dirname, '/public')));
  
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

//  var sessions = require('express-session')

//  app.use(
//    sessions({
//        cookieName: "sessions",
//        secret: "blargadeeblargblarg",
//        saveUninitialized: true,
//        resave: false,
//    })  
//  );
 
// app.use(session({secret:'nikhil'}));
// app.use(express.json());
// app.get("/confirm", function(req,res){
//   console.log(req.session)
//   if(req.session.visited == false || req.session.visited == undefined)
//   {
//       res.sendFile(__dirname+'/html/login.html');
//   }
//   .
//   {
//       res.sendFile(__dirname+'/html/confirm.html');
//   }    
// });
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

app.use(sessions({
    cookieName: "sessions",
    secret: "nikhil16",
    saveUninitialized:true,
    resave: false
}));

var session;
app.use(express.json());
 
 
/* Connection of Mongoose*/
 const mongoose=require('mongoose');
 mongoose.connect('mongodb+srv://krishna:krishna@cluster0.a09oz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology : true,
    useNewUrlParser : true,

 }).then(()=>{
   console.log("Mongoose Connected");
 }).catch((e)=>{
   console.log("Mongoose not connected");
 });



 //calling Schemas

 const admindata=require('./schema/Adminlogin.js');
 const registerdata=require('./schema/register_schema.js');
 const userdata=require('./schema/user_schema.js');
 const feedback=require('./schema/leave-review')
//  const review=require('./schema/Admin-review')
 const Restaurant=require('./schema/Adminaddrestaurant.js')
 
 const Item=require('./schema/manageritem.js')
//  const restaurantdata=require('./schema/restaurant.js')

//  console.log(Items)

//  console.log(registerdata)
  /* Get home page */
//  app.get("/",function(req, res){
   
//    session=req.session;
//     if(session.user){
//         res.send("Welcome User,<a href='/logout'>Click Here to logout</a>");
//     }else
//     res.sendFile(__dirname + "/html/login.html");

    
//  });

 app.get("/",function(req, res){
  res.sendFile(__dirname + "/html/index-9.html");
});

/* Get  order */
app.get("/order",function(req, res){
  res.sendFile(__dirname + "/html/order.html");
});

/* Get invoice  page */
app.get("/contacts",function(req, res){
  res.sendFile(__dirname + "/html/contacts.html");
});
/Get listings/
app.get("/register",function(req, res){
  res.sendFile(__dirname + "/html/register.html");
});
//REVIEW POST
app.post('/leave-review',(req,res)=>{
  var x=req.body.range;
  var y=req.body.review;
  var z=req.body.matter;
 
  {
      feedback.create({
        
          range:x,
          review:y,
          matter:z

      })
  }
  res.redirect('/');
})


//REVIEW GET

app.get('/get-review', function(req,res){
  // console.log(Items)
  feedback.find({ range:"5"},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})


app.get("/leave-review",function(req, res){
  res.sendFile(__dirname + "/html/leave-review.html");
});

/* Get messages */
app.get("/login",function(req, res){
    res.sendFile(__dirname + "/html/login.html");
    console.log(req.body);
    
  });
  app.get("/logout",function(req, res){
    req.session.destroy();
    res.redirect('/');

    
  });
/* Get tables page */
app.get("/listing-map",function(req, res){
  res.sendFile(__dirname + "/html/listing-map.html");
});



app.get("/help",function(req, res){
  res.sendFile(__dirname + "/html/help.html");
});
app.get("/header-cart-top",function(req, res){
  res.sendFile(__dirname + "/html/header-cart-top.html");
});
app.get("/header-user-logged",function(req, res){
  res.sendFile(__dirname + "/html/header-user-logged.html");
});
app.get("/categories",function(req, res){
  res.sendFile(__dirname + "/html/categories.html");
});
app.get("/confirm",function(req, res){
 
  session=req.session;
    if(session.user){
        // console.log("working");
        console.log(session.user);
        res.sendFile(__dirname + '/html/confirm.html');
    }
    else{
        res.redirect("/login")
    }
});
app.get("/detail-restaurant",function(req, res){
  res.sendFile(__dirname + "/html/detail-restaurant.html");
});
app.get("/detail-restaurant-2",function(req, res){
  res.sendFile(__dirname + "/html/detail-restaurant-2.html");
});
app.get("/detail-restaurant-3",function(req, res){
  res.sendFile(__dirname + "/html/detail-restaurant-3.html");
});
app.get("/detail-restaurant-4",function(req, res){
  res.sendFile(__dirname + "/html/detail-restaurant-4.html");
});
app.get("/detail-restaurant-5",function(req, res){
  res.sendFile(__dirname + "/html/detail-restaurant-5.html");
});
app.get("/detail-restaurant-6",function(req, res){
  res.sendFile(__dirname + "/html/detail-restaurant-6.html");
});

app.get("/icon-pack-1",function(req, res){
  res.sendFile(__dirname + "/html/icon-pack-1.html");
});

app.get("/icon-pack-2",function(req, res){
  res.sendFile(__dirname + "/html/icon-pack-2.html");
});
app.get("/modal-newsletter",function(req, res){
  res.sendFile(__dirname + "/html/modal-newsletter.html");
});

app.get("/modal-advertise",function(req, res){
  res.sendFile(__dirname + "/html/modal-advertise.html");
});
app.get("/shortcodes",function(req, res){
  res.sendFile(__dirname + "/html/shortcodes.html");
});

//Manager section page linking
app.get("/manager",function(req, res){
  res.sendFile(__dirname + "/manager/sites/index.html");
});
app.get("/Managerlogin",function(req, res){
  res.sendFile(__dirname + "/manager/sites/ManagerLogin.html");
});
/* add item*/
app.get("/additem",function(req, res){
  res.sendFile(__dirname + "/manager/sites/additem.html");
 });
 /* Get edit order */
app.get("/manageredit-order",function(req, res){
  res.sendFile(__dirname + "/manager/sites/edit-order.html");
 });
 
 /* Get invoice  page */
 app.get("/managerinvoice",function(req, res){
  res.sendFile(__dirname + "/manager/sites/invoice.html");
 });
 /*Get listings*/
 app.get("/managerlistings",function(req, res){
  res.sendFile(__dirname + "/manager/sites/listings.html");
 });
 
 
 /*Get Reviewsy*/
 app.get("/managerreviews",function(req, res){
  res.sendFile(__dirname + "/manager/sites/reviews.html");
  console.log(req.body);
  
 });
/* Get messages */
app.get("/managermessages",function(req, res){
  res.sendFile(__dirname + "/manager/sites/messages.html");
  console.log(req.body);
  
});
/* Get tables page */
app.get("/managertables",function(req, res){
res.sendFile(__dirname + "/manager/sites/tables.html");
});

/* Get admin profile */
app.get("/managerprofile",function(req, res){
res.sendFile(__dirname + "/manager/sites/Adminprofile.html");
});
/* Get orders */

app.get("/managerorders",function(req, res){
res.sendFile(__dirname + "/manager/sites/orders.html");
});


//Admin section page linking
app.get("/Admin",function(req, res){
  res.sendFile(__dirname + "/Admin/sites/index.html");
});
app.get("/Adminlogin",function(req, res){
  res.sendFile(__dirname + "/Admin/sites/AdminLogin.html");
});




app.post('/sign_up',(req,res)=>{
  var a=req.body.name;
  var d=req.body.city;
  var e=req.body.address;
  var f=req.body.state;
  var g=req.body.zipcode;
  var h=req.body.cat;
  var z=req.body.img;

 
  {
      Restaurant.create({
        
          resname:a,
          city:d,
          address:e,
          state:f,
          zipcode:g,
          cat:h,
          img:z,
          
      })
  }
  res.redirect('/Admin');
})

app.post('/add_item',(req,res)=>{
  var a=req.body.name;
  var d=req.body.des;
  var e=req.body.itemname;
  var x=req.body.cat;
  var g=req.body.price;
  var h=req.body.img;

 
  {
      Item.create({
        
          name:a,
          des:d,
          itemname:e,
          price:g,
         img:h,
          cat:x,
          
      })
  }
  res.redirect('/');
})
app.get("/addrestaurant",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/addrestaurant.html");
});
/* Get edit order */
app.get("/Adminedit-order",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/edit-order.html");
});

/* Get invoice  page */
app.get("/Admininvoice",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/invoice.html");
});
/*Get listings*/
app.get("/Adminlistings",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/listings.html");
});


/*Get Reviewsy*/
app.get("/Adminreviews",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/reviews.html");
 console.log(req.body);
 
});

//get review to admin

app.get('/get-rev', function(req,res){
  // console.log(Items)
  feedback.find({ range:"5"},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})


/* Get messages */
app.get("/Adminmessages",function(req, res){
   res.sendFile(__dirname + "/Admin/sites/messages.html");
   console.log(req.body);
   
 });
/* Get tables page */
app.get("/Admintables",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/tables.html");
});

/* Get admin profile */
app.get("/Adminprofile",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/Adminprofile.html");
});
/* Get orders */

app.get("/Adminorders",function(req, res){
 res.sendFile(__dirname + "/Admin/sites/orders.html");
});

// Admin Login Data
app.get('/admin',function(req,res){
  
  session = req.session;
  if(session.user){
      console.log(session.user)
      res.sendFile(__dirname + '/Admin/sites/AdminLogin.html')
  }
  else{
      res.redirect('/Adminlogin');
  }
})

app.get('/adminlogout',function(req,res){
  req.session.destroy();
  res.redirect('/adminlogin');
})
//post the data to database
app.post('/admindata',function(req,res){
  console.log(req.body);
  session=req.session; 
  admindata.findOne({email:req.body.email,password:req.body.password},function(err,docs){
      if(err || docs==null)
      {
          res.sendStatus(500);
      }
      else{
          
          session.user=docs;

          res.send(docs);
      }
  })
});


app.post('/senddata',function(req,res){
console.log(req.body);
// session=req.session;
var obj=new registerdata({
  name:req.body.name,
  email:req.body.email,
  password:req.body.password,
})
registerdata.findOne({email:req.body.email},function(err,docs){
  if(err || docs==null){
    console.log(err)
    obj.save(function(err,results){
      if(results){
        console.log("results " + results);
        res.send(results);
      }
      else{
        console.log(err)
        res.send(err);
      }
    })
  }
  else{
    res.sendStatus(500);
  }
  
})
});


app.post('/logindata',function(req,res){
  console.log(req.body)
  session=req.session;

  registerdata.findOne({email:req.body.email,password:req.body.password},function(err,docs){
    if(err || docs==null){
      res.sendStatus(500);
    }
    else{
      session.user=docs;
      res.send(docs);

    }
    
  })
});

// getting items data for detail-restaurant

app.get('/getitems1', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Taj Darbar",category_name:"starters",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems2', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Taj Darbar",category_name:"main course",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems3', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Taj Darbar",category_name:"desserts",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems4', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Taj Darbar",category_name:"drinks",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})


// getting items data for detail-restaurant-2

app.get('/getitems5', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Bawarchi",category_name:"starters",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems6', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Bawarchi",category_name:"main course",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems7', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Bawarchi",category_name:"desserts",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems8', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Bawarchi",category_name:"drinks",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})

// getting items data for detail-restaurant-3

app.get('/getitems9', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Paradise",category_name:"starters",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems10', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Paradise",category_name:"main course",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems11', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Paradise",category_name:"desserts",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems12', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Paradise",category_name:"drinks",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})


// getting items data for detail-restaurant-4

app.get('/getitems13', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"shelton",category_name:"starters",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems14', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"shelton",category_name:"main course",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems15', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"shelton",category_name:"desserts",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems16', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"shelton",category_name:"drinks",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})


// getting items data for detail-restaurant-5

app.get('/getitems17', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Burger king",category_name:"Best in Burger",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems18', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Burger king",category_name:"Recommended",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems19', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Burger king",category_name:"Deal of the day",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems20', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Burger king",category_name:"Drinks",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
// getting items data for detail-restaurant-6

app.get('/getitems21', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Pizza hut",category_name:"New launches",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems22', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Pizza hut",category_name:"Veg pizza",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems23', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Pizza hut",category_name:"Desserts",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})
app.get('/getitems24', function(req,res){
  // console.log(Items)
  Item.find({restaurant_name:"Pizza hut",category_name:"Drinks",},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})



//get restaurant data

app.get('/get-restaurant', function(req,res){
  // console.log(Items)
  Restaurant.find({restaurant_state:"Andhra Pradesh"},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})

app.get('/get-item', function(req,res){
  // console.log(Items)
  Item.find({restaurantname:"Taj Darbar"},function(err,docs){
    if(err){
      console.log(err)
    }
    else{
      // console.log(docs)
      res.send(docs)
    }
  })
})




 app.listen(8000, () => console.log("Successfully server started."));