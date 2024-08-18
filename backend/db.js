const mongoose = require('mongoose');
const mongoURI='mongodb+srv://shubhammahale49:Sucess1@cluster0.qdbt98x.mongodb.net/mern?retryWrites=true&w=majority';
//const mongoURI = 'mongodb://admin:password@mongodb:27017/';
//const mongoContainer = 'mongodb://shubhammahale49:Sucess1@ac-sk08ltq-shard-00-00.qdbt98x.mongodb.net:27017,ac-sk08ltq-shard-00-01.qdbt98x.mongodb.net:27017,ac-sk08ltq-shard-00-02.qdbt98x.mongodb.net:27017/mern?ssl=true&replicaSet=atlas-qf3obg-shard-0&authSource=admin&retryWrites=true&w=majority';
// const mongoDB=async()=>{
//     try {
//         mongoose.set("strictQuery", false);
//         mongoose.connect(mongoURL);
//         console.log("Connected to Mongo Successfullyr!");
//         const fetched_data=await mongoose.connection.db.collections("food_items");
//         fetched_data.find({}).toArray(function(err,data){
//             if(err)console.log(err);
//             else console.log(data);
//         })
//       } catch (error) {
//         console.log(error);
//       }
//     };


const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected!');
      // let db=mongoose.connection.db.databaseName.collection;
      // console.log(db)
      let fetched_data = mongoose.connection.db.collection('food_items');
      let data=await fetched_data.find({}).toArray()
      let foodCategory = await mongoose.connection.db.collection("food_category");
      let catData=await foodCategory.find({}).toArray()
     console.log(data);
      console.log(catData);
      global.food_items = data;
      global.foodcategory = catData;
    } catch (error) {
      console.log('err: ', error);
    }
  };

// const mongoDB = async () => {
//   await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
//     if (err) console.log(err)
//     else {
//       console.log('Connected!');
//       const fetched_data = await mongoose.connection.db.collection("food_items");
//       fetched_data.find({}).toArray(function (err, data) {
//         if (err) console.log(err)
//         else {
//           global.food_items = data
//           console.log(data)
//         }
//       })
//     }
//   });


module.exports = mongoDB;

