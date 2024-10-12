const express=require("express");
const cors=require("cors");
const app=express();
const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const { MongoClient, ObjectId } = require('mongodb');
const uri="mongodb+srv://rehanictd:hwZTxt04GjC6eHh6@cluster0.grsue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
async function run() {
    try {
        // Connect to the Atlas cluster
         await client.connect();
         // Get the database and collection on which to run the operation
         const db = client.db("rehandb");
         const col = db.collection("people");
         const course_collection = db.collection("courses");

         app.post("/users", async (req, res) => {
            const users = req.body;
            //console.log(users);
            //const result = await col.insertOne(users);
            const result = await col.insertOne(users);
            res.send(result);
          });


          


          app.get("/users",async (req,res)=>
        {
            const filter = { "name.last": "Turing" };
            //const document = await col.findOne(filter);
            const result = await col.find().toArray();
            //console.log(result)

            res.send(result);
        });


        //course api from here

        app.post("/courses", async (req, res) => {
          const courses = req.body;
          //console.log(courses);
          //const result = await col.insertOne(users);
          const result = await course_collection.insertOne(courses);
          res.send(result);
        });

        app.get("/courses",async (req,res)=>
          {
              //const filter = { "name.last": "Turing" };
              //const document = await col.findOne(filter);
              const result = await course_collection.find().toArray();
              //console.log(result)
  
              res.send(result);
          });


        app.get("/course/:id",async (req,res)=>
          {
              //const filter = { "name.last": "Turing" };
              const id=req.params.id;
              const filter = { _id: new ObjectId(id) };
              //const document = await col.findOne(filter);
              const result = await course_collection.findOne(filter);
              //console.log(result)
  
              res.send(result);
          });

        app.delete("/course/:id", async (req, res) => {
          const id = req.params.id;
          console.log(id,"reud");
          const query = { _id: new ObjectId(id) };
          const result = await course_collection.deleteOne(query);
          res.send(result);
        });

        app.put("/course/:id",async (req,res)=>{
          const id=req.params.id;
          console.log(id);
          const course=req.body;
          const filter = { _id: new ObjectId(id) };
          const option = { upsert: true };
          const updatedCourse = {
            $set: {
              course_title: course.course_title,
              course_description: course.course_description,
              course_price: course.course_price,
              course_duration: course.course_duration,
               
            },
          };

          const result = await course_collection.updateOne(
            filter,
            updatedCourse,
            option
          );
          res.send(result);


        })

        app.delete("/user/:id", async (req, res) => {
            const id = req.params.id;
            //console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await col.deleteOne(query);
            res.send(result);
          });


	 
app.get("/"  , (req , res)=> {
    res.send(
        "congratutations!reud! backend server running"
    );
});


         // Create new documents                                                                                                                                         
        //  const peopleDocuments = [
        //    {
        //      "name": { "first": "Alan", "last": "Turing" },
        //      "birth": new Date(1912, 5, 23), // May 23, 1912                                                                                                                                 
        //      "death": new Date(1954, 5, 7),  // May 7, 1954                                                                                                                                  
        //      "contribs": [ "Turing machine", "Turing test", "Turingery" ],
        //      "views": 1250000
        //    },
        //    {
        //      "name": { "first": "Grace", "last": "Hopper" },
        //      "birth": new Date(1906, 12, 9), // Dec 9, 1906                                                                                                                                 
        //      "death": new Date(1992, 1, 1),  // Jan 1, 1992                                                                                                                                  
        //      "contribs": [ "Mark I", "UNIVAC", "COBOL" ],
        //      "views": 3860000
        //    }
        //  ]
         // Insert the documents into the specified collection        
        
         // Find the document
         const filter = { "name.last": "Turing" };
         const document = await col.findOne(filter);
         // Print results
        // console.log(`hi, port ${port} ,Document founds:\n" + JSON.stringify(${document})`);
        console.log("connected!!");
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        //await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`rehan-reud React Node CRUD Server is Running on ${port}`);
  });