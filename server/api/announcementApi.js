import express, {request} from "express";
import {BSON, ObjectId} from 'bson';

export function AnnouncementApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {


        const listAllAnnouncements = await db.collection("announcement")
            .find()
            .map(({ _id, title, description, startTime, endTime, school, schoolclass, recipeId, authorId }) => ({
                id: _id,
                title,
                description,
                startTime,
                endTime,
                school,
                schoolclass,
                recipeId,
                authorId
            }))
            .toArray();

        res.json(listAllAnnouncements)
    })

    api.post("/", async (req, res) => {


        const {_id, title, description, startTime, endTime, school, schoolClass, recipeId, authorId} = req.body


        console.log(req.body.authorId)


        const currentUser = await db.collection("users")
            .find({_id : new ObjectId(authorId)}).toArray();

        console.log(currentUser);






        console.log(req.body)

        /*
        const result = db.collection("announcement").insertOne({
            id: _id,
            title,
            description,
            startTime,
            endTime,
            schoolclass,
            recipeId,
            authorId


        });

         */

        res.sendStatus(200);

    })

    return api;
}